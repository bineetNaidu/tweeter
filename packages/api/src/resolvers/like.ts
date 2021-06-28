import { Like } from '../entities/Like';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Tweet } from '../entities/Tweet';
import { isAuthed } from '../utils/middlewares';
import { IContext } from '../utils/types';
import { User } from '../entities/User';

@Resolver()
export class LikeResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async like(
    @Arg('tweetId') tweetId: number,
    @Ctx() { authUser }: IContext
  ): Promise<boolean> {
    try {
      const tweet = await Tweet.findOne(tweetId);
      if (!tweet) throw new Error('Tweet Was Not found!');
      const like = await Like.findOne({
        where: {
          user: authUser!.id,
          tweet: tweet.id,
        },
      });

      if (like) {
        // User want to remove this like
        await like.remove();
        return true;
      } else {
        // wants to add like to that tweet
        const user = await User.findOne(authUser!.id);
        await Like.create({
          tweet,
          user,
        }).save();

        return true;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
