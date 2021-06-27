import { Tweet } from '../entities/Tweet';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { IContext } from '../utils/types';
import { User } from '../entities/User';
import { getConnection } from 'typeorm';

@Resolver()
export class TweetResolvers {
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
