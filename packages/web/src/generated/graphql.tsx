import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  id: Scalars['Float'];
  user: User;
  tweet: Tweet;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  text: Scalars['String'];
  user: User;
  tweet: Tweet;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Float'];
  user: User;
  tweet: Tweet;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteTweet: Scalars['Boolean'];
  createTweet: Tweet;
  register: UserResponse;
  login: UserResponse;
  like: Scalars['Boolean'];
  addComment: Comment;
  updateComment?: Maybe<Comment>;
  deleteComment: Scalars['Boolean'];
  addBookmark?: Maybe<Bookmark>;
  removeBookmark: Scalars['Boolean'];
};


export type MutationDeleteTweetArgs = {
  id: Scalars['Float'];
};


export type MutationCreateTweetArgs = {
  body: Scalars['String'];
  media?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLikeArgs = {
  tweetId: Scalars['Float'];
};


export type MutationAddCommentArgs = {
  text: Scalars['String'];
  tweetId: Scalars['Int'];
};


export type MutationUpdateCommentArgs = {
  text: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationAddBookmarkArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveBookmarkArgs = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  info: Scalars['String'];
  getTweetFromUser: Array<Tweet>;
  getLikeTweetsFromUser: Array<Like>;
  getMediaTweetsFromUser: Array<Tweet>;
  tweets: Array<Tweet>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  bookmarks: Array<Bookmark>;
};


export type QueryGetTweetFromUserArgs = {
  username: Scalars['String'];
};


export type QueryGetLikeTweetsFromUserArgs = {
  username: Scalars['String'];
};


export type QueryGetMediaTweetsFromUserArgs = {
  username: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['Float'];
  body: Scalars['String'];
  author: User;
  media?: Maybe<Scalars['String']>;
  has_media: Scalars['Boolean'];
  likes: Array<Like>;
  comments: Array<Comment>;
  likeStatus?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  bookmarkStatus?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  first_name: Scalars['String'];
  last_name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type BaseCommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'createdAt' | 'updatedAt'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  ) }
);

export type BaseTweetFragment = (
  { __typename?: 'Tweet' }
  & Pick<Tweet, 'id' | 'body' | 'media' | 'has_media' | 'createdAt' | 'updatedAt' | 'likeStatus' | 'bookmarkStatus'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  ), likes: Array<(
    { __typename?: 'Like' }
    & Pick<Like, 'id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )>, comments: Array<(
    { __typename?: 'Comment' }
    & BaseCommentFragment
  )> }
);

export type BaseUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'first_name' | 'last_name' | 'username' | 'email' | 'bio' | 'avatar' | 'banner' | 'createdAt' | 'updatedAt'>
);

export type AddBookmarkMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type AddBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { addBookmark?: Maybe<(
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, 'id'>
    & { tweet: (
      { __typename?: 'Tweet' }
      & Pick<Tweet, 'id'>
    ) }
  )> }
);

export type AddCommentMutationVariables = Exact<{
  tweetId: Scalars['Int'];
  text: Scalars['String'];
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text'>
  ) }
);

export type CreateTweetMutationVariables = Exact<{
  body: Scalars['String'];
  media?: Maybe<Scalars['String']>;
}>;


export type CreateTweetMutation = (
  { __typename?: 'Mutation' }
  & { createTweet: (
    { __typename?: 'Tweet' }
    & Pick<Tweet, 'id' | 'body' | 'media' | 'has_media' | 'createdAt'>
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeleteTweetMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteTweetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTweet'>
);

export type LikeMutationVariables = Exact<{
  tweetId: Scalars['Float'];
}>;


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'like'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & BaseUserFragment
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & BaseUserFragment
    )> }
  ) }
);

export type RemoveBookmarkMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemoveBookmarkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeBookmark'>
);

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  text: Scalars['String'];
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'createdAt' | 'updatedAt'>
  )> }
);

export type BookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type BookmarksQuery = (
  { __typename?: 'Query' }
  & { bookmarks: Array<(
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, 'id'>
    & { tweet: (
      { __typename?: 'Tweet' }
      & BaseTweetFragment
    ) }
  )> }
);

export type GetLikeTweetsFromUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetLikeTweetsFromUserQuery = (
  { __typename?: 'Query' }
  & { getLikeTweetsFromUser: Array<(
    { __typename?: 'Like' }
    & Pick<Like, 'id'>
    & { tweet: (
      { __typename?: 'Tweet' }
      & BaseTweetFragment
    ) }
  )> }
);

export type GetMediaTweetsFromUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetMediaTweetsFromUserQuery = (
  { __typename?: 'Query' }
  & { getMediaTweetsFromUser: Array<(
    { __typename?: 'Tweet' }
    & BaseTweetFragment
  )> }
);

export type GetTweetFromUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetTweetFromUserQuery = (
  { __typename?: 'Query' }
  & { getTweetFromUser: Array<(
    { __typename?: 'Tweet' }
    & BaseTweetFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export type TweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type TweetsQuery = (
  { __typename?: 'Query' }
  & { tweets: Array<(
    { __typename?: 'Tweet' }
    & BaseTweetFragment
  )> }
);

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export const BaseCommentFragmentDoc = gql`
    fragment BaseComment on Comment {
  id
  text
  user {
    id
    username
    avatar
  }
  createdAt
  updatedAt
}
    `;
export const BaseTweetFragmentDoc = gql`
    fragment BaseTweet on Tweet {
  id
  body
  author {
    id
    username
    avatar
  }
  media
  has_media
  createdAt
  updatedAt
  likeStatus
  likes {
    id
    user {
      username
    }
  }
  bookmarkStatus
  comments {
    ...BaseComment
  }
}
    ${BaseCommentFragmentDoc}`;
export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  id
  first_name
  last_name
  username
  email
  bio
  avatar
  banner
  createdAt
  updatedAt
}
    `;
export const AddBookmarkDocument = gql`
    mutation AddBookmark($id: Float!) {
  addBookmark(id: $id) {
    id
    tweet {
      id
    }
  }
}
    `;
export type AddBookmarkMutationFn = Apollo.MutationFunction<AddBookmarkMutation, AddBookmarkMutationVariables>;

/**
 * __useAddBookmarkMutation__
 *
 * To run a mutation, you first call `useAddBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookmarkMutation, { data, loading, error }] = useAddBookmarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<AddBookmarkMutation, AddBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookmarkMutation, AddBookmarkMutationVariables>(AddBookmarkDocument, options);
      }
export type AddBookmarkMutationHookResult = ReturnType<typeof useAddBookmarkMutation>;
export type AddBookmarkMutationResult = Apollo.MutationResult<AddBookmarkMutation>;
export type AddBookmarkMutationOptions = Apollo.BaseMutationOptions<AddBookmarkMutation, AddBookmarkMutationVariables>;
export const AddCommentDocument = gql`
    mutation AddComment($tweetId: Int!, $text: String!) {
  addComment(tweetId: $tweetId, text: $text) {
    id
    text
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const CreateTweetDocument = gql`
    mutation CreateTweet($body: String!, $media: String) {
  createTweet(body: $body, media: $media) {
    id
    body
    media
    has_media
    createdAt
  }
}
    `;
export type CreateTweetMutationFn = Apollo.MutationFunction<CreateTweetMutation, CreateTweetMutationVariables>;

/**
 * __useCreateTweetMutation__
 *
 * To run a mutation, you first call `useCreateTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTweetMutation, { data, loading, error }] = useCreateTweetMutation({
 *   variables: {
 *      body: // value for 'body'
 *      media: // value for 'media'
 *   },
 * });
 */
export function useCreateTweetMutation(baseOptions?: Apollo.MutationHookOptions<CreateTweetMutation, CreateTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument, options);
      }
export type CreateTweetMutationHookResult = ReturnType<typeof useCreateTweetMutation>;
export type CreateTweetMutationResult = Apollo.MutationResult<CreateTweetMutation>;
export type CreateTweetMutationOptions = Apollo.BaseMutationOptions<CreateTweetMutation, CreateTweetMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Int!) {
  deleteComment(id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteTweetDocument = gql`
    mutation DeleteTweet($id: Float!) {
  deleteTweet(id: $id)
}
    `;
export type DeleteTweetMutationFn = Apollo.MutationFunction<DeleteTweetMutation, DeleteTweetMutationVariables>;

/**
 * __useDeleteTweetMutation__
 *
 * To run a mutation, you first call `useDeleteTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTweetMutation, { data, loading, error }] = useDeleteTweetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTweetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTweetMutation, DeleteTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTweetMutation, DeleteTweetMutationVariables>(DeleteTweetDocument, options);
      }
export type DeleteTweetMutationHookResult = ReturnType<typeof useDeleteTweetMutation>;
export type DeleteTweetMutationResult = Apollo.MutationResult<DeleteTweetMutation>;
export type DeleteTweetMutationOptions = Apollo.BaseMutationOptions<DeleteTweetMutation, DeleteTweetMutationVariables>;
export const LikeDocument = gql`
    mutation Like($tweetId: Float!) {
  like(tweetId: $tweetId)
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      ...BaseUser
    }
    token
  }
}
    ${BaseUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...BaseUser
    }
    token
  }
}
    ${BaseUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveBookmarkDocument = gql`
    mutation RemoveBookmark($id: Float!) {
  removeBookmark(id: $id)
}
    `;
export type RemoveBookmarkMutationFn = Apollo.MutationFunction<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;

/**
 * __useRemoveBookmarkMutation__
 *
 * To run a mutation, you first call `useRemoveBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBookmarkMutation, { data, loading, error }] = useRemoveBookmarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>(RemoveBookmarkDocument, options);
      }
export type RemoveBookmarkMutationHookResult = ReturnType<typeof useRemoveBookmarkMutation>;
export type RemoveBookmarkMutationResult = Apollo.MutationResult<RemoveBookmarkMutation>;
export type RemoveBookmarkMutationOptions = Apollo.BaseMutationOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($id: Int!, $text: String!) {
  updateComment(id: $id, text: $text) {
    id
    text
    createdAt
    updatedAt
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const BookmarksDocument = gql`
    query Bookmarks {
  bookmarks {
    id
    tweet {
      ...BaseTweet
    }
  }
}
    ${BaseTweetFragmentDoc}`;

/**
 * __useBookmarksQuery__
 *
 * To run a query within a React component, call `useBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarksQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<BookmarksQuery, BookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, options);
      }
export function useBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarksQuery, BookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, options);
        }
export type BookmarksQueryHookResult = ReturnType<typeof useBookmarksQuery>;
export type BookmarksLazyQueryHookResult = ReturnType<typeof useBookmarksLazyQuery>;
export type BookmarksQueryResult = Apollo.QueryResult<BookmarksQuery, BookmarksQueryVariables>;
export const GetLikeTweetsFromUserDocument = gql`
    query GetLikeTweetsFromUser($username: String!) {
  getLikeTweetsFromUser(username: $username) {
    id
    tweet {
      ...BaseTweet
    }
  }
}
    ${BaseTweetFragmentDoc}`;

/**
 * __useGetLikeTweetsFromUserQuery__
 *
 * To run a query within a React component, call `useGetLikeTweetsFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikeTweetsFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikeTweetsFromUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetLikeTweetsFromUserQuery(baseOptions: Apollo.QueryHookOptions<GetLikeTweetsFromUserQuery, GetLikeTweetsFromUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLikeTweetsFromUserQuery, GetLikeTweetsFromUserQueryVariables>(GetLikeTweetsFromUserDocument, options);
      }
export function useGetLikeTweetsFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLikeTweetsFromUserQuery, GetLikeTweetsFromUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLikeTweetsFromUserQuery, GetLikeTweetsFromUserQueryVariables>(GetLikeTweetsFromUserDocument, options);
        }
export type GetLikeTweetsFromUserQueryHookResult = ReturnType<typeof useGetLikeTweetsFromUserQuery>;
export type GetLikeTweetsFromUserLazyQueryHookResult = ReturnType<typeof useGetLikeTweetsFromUserLazyQuery>;
export type GetLikeTweetsFromUserQueryResult = Apollo.QueryResult<GetLikeTweetsFromUserQuery, GetLikeTweetsFromUserQueryVariables>;
export const GetMediaTweetsFromUserDocument = gql`
    query GetMediaTweetsFromUser($username: String!) {
  getMediaTweetsFromUser(username: $username) {
    ...BaseTweet
  }
}
    ${BaseTweetFragmentDoc}`;

/**
 * __useGetMediaTweetsFromUserQuery__
 *
 * To run a query within a React component, call `useGetMediaTweetsFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMediaTweetsFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMediaTweetsFromUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetMediaTweetsFromUserQuery(baseOptions: Apollo.QueryHookOptions<GetMediaTweetsFromUserQuery, GetMediaTweetsFromUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMediaTweetsFromUserQuery, GetMediaTweetsFromUserQueryVariables>(GetMediaTweetsFromUserDocument, options);
      }
export function useGetMediaTweetsFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMediaTweetsFromUserQuery, GetMediaTweetsFromUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMediaTweetsFromUserQuery, GetMediaTweetsFromUserQueryVariables>(GetMediaTweetsFromUserDocument, options);
        }
export type GetMediaTweetsFromUserQueryHookResult = ReturnType<typeof useGetMediaTweetsFromUserQuery>;
export type GetMediaTweetsFromUserLazyQueryHookResult = ReturnType<typeof useGetMediaTweetsFromUserLazyQuery>;
export type GetMediaTweetsFromUserQueryResult = Apollo.QueryResult<GetMediaTweetsFromUserQuery, GetMediaTweetsFromUserQueryVariables>;
export const GetTweetFromUserDocument = gql`
    query GetTweetFromUser($username: String!) {
  getTweetFromUser(username: $username) {
    ...BaseTweet
  }
}
    ${BaseTweetFragmentDoc}`;

/**
 * __useGetTweetFromUserQuery__
 *
 * To run a query within a React component, call `useGetTweetFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTweetFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTweetFromUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetTweetFromUserQuery(baseOptions: Apollo.QueryHookOptions<GetTweetFromUserQuery, GetTweetFromUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTweetFromUserQuery, GetTweetFromUserQueryVariables>(GetTweetFromUserDocument, options);
      }
export function useGetTweetFromUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTweetFromUserQuery, GetTweetFromUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTweetFromUserQuery, GetTweetFromUserQueryVariables>(GetTweetFromUserDocument, options);
        }
export type GetTweetFromUserQueryHookResult = ReturnType<typeof useGetTweetFromUserQuery>;
export type GetTweetFromUserLazyQueryHookResult = ReturnType<typeof useGetTweetFromUserLazyQuery>;
export type GetTweetFromUserQueryResult = Apollo.QueryResult<GetTweetFromUserQuery, GetTweetFromUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TweetsDocument = gql`
    query Tweets {
  tweets {
    ...BaseTweet
  }
}
    ${BaseTweetFragmentDoc}`;

/**
 * __useTweetsQuery__
 *
 * To run a query within a React component, call `useTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTweetsQuery(baseOptions?: Apollo.QueryHookOptions<TweetsQuery, TweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TweetsQuery, TweetsQueryVariables>(TweetsDocument, options);
      }
export function useTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetsQuery, TweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TweetsQuery, TweetsQueryVariables>(TweetsDocument, options);
        }
export type TweetsQueryHookResult = ReturnType<typeof useTweetsQuery>;
export type TweetsLazyQueryHookResult = ReturnType<typeof useTweetsLazyQuery>;
export type TweetsQueryResult = Apollo.QueryResult<TweetsQuery, TweetsQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;