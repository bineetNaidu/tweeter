import 'reflect-metadata';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/Hello';
import { Tweet } from './entities/Tweet';
import { createConnection } from 'typeorm';
import { ___prod___ } from './utils/contants';
import { TweetResolvers } from './resolvers/tweets';
import { User } from './entities/User';
import { UserResolvers } from './resolvers/users';
import { IContext } from './utils/types';
import { decodeToken } from './utils/jwt';
import { Like } from './entities/Like';
import { LikeResolver } from './resolvers/like';
import { Comment } from './entities/Comment';

dotenv.config();

const bootstrap = async () => {
  if (!process.env.DATABASE_URI) {
    throw new Error('??>> {" DATABASE_URI must be defined!! "} ');
  }
  if (!process.env.JWT_SECRET) {
    throw new Error('??>> {" JWT_SECRET must be defined!! "} ');
  }

  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URI,
    logging: true,
    synchronize: !___prod___,
    entities: [Tweet, User, Like, Comment],
  });

  if (!conn.isConnected) {
    throw new Error('Database Connection has not been established yet!');
  }

  const server = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [HelloResolver, TweetResolvers, UserResolvers, LikeResolver],
    }),
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
    context: ({ req, res, connection }): IContext => {
      let token = '';
      if (req && req.headers.authorization) {
        token = req.headers.authorization.split('Bearer ')[1];
      } else if (connection && connection.context.Authorization) {
        token = connection.context.Authorization.split('Bearer ')[1];
      }
      const authUser = decodeToken(token);

      return { req, res, authUser };
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

bootstrap();
