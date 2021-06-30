import { isAuthed } from '../utils/middlewares';
import { IContext } from '../utils/types';
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Comment } from '../entities/Comment';
import { Tweet } from '../entities/Tweet';
import { User } from '../entities/User';

@Resolver()
export class CommentResolver {
  @Mutation(() => Comment)
  @UseMiddleware(isAuthed)
  async addComment(
    @Arg('tweetId', () => Int) tweetId: number,
    @Arg('text') text: string,
    @Ctx() { authUser }: IContext
  ): Promise<Comment> {
    const user = await User.findOne(authUser!.id);
    if (!user) throw new Error('User Not Found!');
    const tweet = await Tweet.findOne(tweetId);
    if (!tweet) throw new Error('Tweet Not Found!');

    const comment = await Comment.create({
      tweet,
      text,
      user,
    }).save();

    return comment;
  }
}
