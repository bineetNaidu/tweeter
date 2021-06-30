import { isAuthed } from '../utils/middlewares';
import { IContext } from '../utils/types';
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Comment } from '../entities/Comment';
import { Tweet } from '../entities/Tweet';
import { User } from '../entities/User';
import { getConnection } from 'typeorm';

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

  @Mutation(() => Comment, { nullable: true })
  @UseMiddleware(isAuthed)
  async updateComment(
    @Arg('id', () => Int) id: number,
    @Arg('text') text: string,
    @Ctx() { authUser }: IContext
  ): Promise<Comment | null> {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Comment)
        .set({
          text,
        })
        .where('id = :id and "userId" = :userId', {
          id,
          userId: authUser!.id,
        })
        .returning('*')
        .execute();
      return result.raw[0];
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async deleteComment(
    @Arg('id', () => Int) id: number,
    @Ctx() { authUser }: IContext
  ): Promise<boolean> {
    try {
      const comment = await Comment.findOne({
        where: {
          id,
          user: authUser!.id,
        },
      });
      if (!comment) throw new Error('Comment Was Not found!');
      await comment.remove();

      return true;
    } catch (err) {
      return false;
    }
  }
}
