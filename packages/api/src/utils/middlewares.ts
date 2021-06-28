import { AuthenticationError } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';
import { IContext } from './types';

export const isAuthed: MiddlewareFn<IContext> = ({ context }, next) => {
  const { authUser } = context;
  if (!authUser) {
    throw new AuthenticationError('Not Authenticated!');
  }
  return next();
};
