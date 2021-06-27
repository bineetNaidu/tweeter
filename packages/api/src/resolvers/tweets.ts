import { Tweet } from '../entities/Tweet';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { IContext } from '../utils/types';
import { User } from '../entities/User';

@Resolver()
export class TweetResolvers {
  @Query(() => [Tweet])
  async tweets(): Promise<Tweet[]> {
    return Tweet.find({});
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
