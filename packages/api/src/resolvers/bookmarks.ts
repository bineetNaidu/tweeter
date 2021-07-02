import { Tweet } from '../entities/Tweet';
import { User } from '../entities/User';
import { isAuthed } from '../utils/middlewares';
import { IContext } from '../utils/types';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Bookmark } from '../entities/Bookmark';

@Resolver()
export class BookmarkResolvers {
  @Query(() => [Bookmark])
  @UseMiddleware(isAuthed)
  async bookmarks(@Ctx() { authUser }: IContext): Promise<Bookmark[]> {
    const user = await User.findOne(authUser!.id);
    if (!user) throw new Error('Not Authenticated');
    const bookmarksTweets = await Bookmark.find({
      where: {
        user: user.id,
      },
      relations: ['user', 'tweet', 'tweet.author'],
    });
    return bookmarksTweets;
  }
  @Mutation(() => Bookmark, { nullable: true })
  @UseMiddleware(isAuthed)
  async addBookmark(
    @Arg('id') id: number,
    @Ctx() { authUser }: IContext
  ): Promise<Bookmark | null> {
    const user = await User.findOne(authUser!.id);
    if (!user) throw new Error('Not Authenticated');
    const alreadyBookmarked = await Bookmark.findOne({
      where: {
        user,
        tweet: id,
      },
    });
    if (alreadyBookmarked) return null;
    const tweet = await Tweet.findOne(id);
    if (!tweet) return null;

    const bookmark = await Bookmark.create({
      user,
      tweet,
    }).save();
    return bookmark;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async removeBookmark(
    @Arg('id') id: number,
    @Ctx() { authUser }: IContext
  ): Promise<boolean> {
    const tweet = await Tweet.findOne(id);
    if (!tweet) return false;
    const bkmrk = await Bookmark.findOne({
      where: {
        user: authUser!.id,
        tweet: id,
      },
    });

    if (!bkmrk) return false;
    await bkmrk.remove();
    return true;
  }
}
