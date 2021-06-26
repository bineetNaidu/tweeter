import { User } from '../entities/User';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolvers {
  @Query(() => User, { nullable: true })
  async user(@Arg('username') username: string): Promise<User | undefined> {
    return User.findOne({
      where: {
        username,
      },
    });
  }
}
