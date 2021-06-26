import { User } from '../entities/User';
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { validateRegister } from '../utils/validateRegister';
import argon from 'argon2';
import { getConnection } from 'typeorm';
import { createToken } from '../utils/jwt';

@InputType()
export class RegisterInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field({ nullable: true })
  avatar?: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field()
  token?: String;
}
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

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: RegisterInput
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hash = await argon.hash(options.password);
    let user;

    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hash,
          avatar: options.avatar,
          first_name: options.first_name,
          last_name: options.last_name,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        };
      }
    }
    const token = createToken(user);

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'that user does not exist!',
          },
        ],
      };
    }

    const valid = await argon.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    const token = createToken(user);

    return { user, token };
  }
}
