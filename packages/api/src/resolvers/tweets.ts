import { Tweet } from '../entities/Tweet';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { IContext } from '../utils/types';
import { User } from '../entities/User';
import { getConnection } from 'typeorm';
import { isAuthed } from '../utils/middlewares';
import { Like } from '../entities/Like';
import { Comment } from '../entities/Comment';
import { Bookmark } from '../entities/Bookmark';

@Resolver(Tweet)
export class TweetResolvers {
  @FieldResolver(() => Boolean, { nullable: true })
  async bookmarkStatus(
    @Root() tweet: Tweet,
    @Ctx() { authUser }: IContext
  ): Promise<boolean | null> {
    if (!authUser) return null;
    const bm = await Bookmark.findOne({
      where: {
        user: authUser!.id,
        tweet,
      },
    });

    return !!bm;
  }

  @FieldResolver()
  async likes(@Root() tweet: Tweet) {
    const likes = await Like.find({
      where: {
        tweet: tweet.id,
      },
      relations: ['user', 'tweet'],
    });

    return likes;
  }

  @FieldResolver()
  async comments(@Root() tweet: Tweet) {
    const comments = await Comment.find({
      where: {
        tweet: tweet.id,
      },
      relations: ['user', 'tweet'],
    });

    return comments;
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async likeStatus(
    @Root() tweet: Tweet,
    @Ctx() { authUser }: IContext
  ): Promise<boolean | null> {
    if (!authUser) return null;
    const like = await Like.findOne({
      where: {
        user: authUser.id,
        tweet: tweet.id,
      },
    });

    return !!like;
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
