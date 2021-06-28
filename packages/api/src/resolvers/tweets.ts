import { Tweet } from '../entities/Tweet';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { IContext } from '../utils/types';
import { User } from '../entities/User';
import { getConnection } from 'typeorm';
import { isAuthed } from '../utils/middlewares';

@Resolver()
export class TweetResolvers {
  @Mutation(() => Tweet, { nullable: true })
  @UseMiddleware(isAuthed)
  async updateTweet(
    @Arg('id') id: number,
    @Arg('body') body: string,
    @Arg('media', { nullable: true }) media: string,
    @Ctx() { authUser }: IContext
  ): Promise<Tweet | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Tweet)
      .set({ body, media, has_media: media ? true : false })
      .where('id = :id and "authorId" = :authorId', {
        id,
        authorId: authUser!.id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async deleteTweet(
    @Arg('id') id: number,
    @Ctx() { authUser }: IContext
  ): Promise<boolean> {
    try {
      const tweet = await Tweet.findOne({
        where: {
          id,
          author: authUser!.id,
        },
      });
      if (!tweet) throw new Error('tweet not found!');
      await tweet.remove();
      return true;
    } catch (err) {
      return false;
    }
  }

  @Query(() => [Tweet])
  async tweets(): Promise<Tweet[]> {
    const tweets = await getConnection().query(
      `
			select t.*,
			json_build_object(
      'id', u.id,
      'username', u.username,
      'avatar', u.avatar
      ) author
			from tweet AS t
			inner join "user" AS u on u.id = t."authorId"
			order by t."createdAt" DESC 
			`
    );

    return tweets;
  }

  @Mutation(() => Tweet)
  async createTweet(
    @Arg('media', { nullable: true }) media: string,
    @Arg('body') body: string,
    @Ctx() { authUser }: IContext
  ): Promise<Tweet> {
    if (!authUser) {
      throw new Error('NOT AUTHENTICATED');
    }
    const { id } = authUser;
    const user = await User.findOne(id);
    if (!user) throw new Error('User Not found!');
    const tweet = await Tweet.create({
      body,
      has_media: media ? true : false,
      author: user,
      media,
    }).save();

    return tweet;
  }
}
