import { Spin } from 'antd';
import { FC } from 'react';
import { useGetTweetFromUserQuery } from '../generated/graphql';
import { TweetCard } from './TweetCard';

export const UserTweetsContainer: FC<{ username: string }> = ({ username }) => {
  const { data, loading } = useGetTweetFromUserQuery({
    variables: { username },
  });
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
      ) : (
        data?.getTweetFromUser.map((tweet) => (
          <TweetCard tweet={tweet} key={tweet.id} />
        ))
      )}
    </>
  );
};
