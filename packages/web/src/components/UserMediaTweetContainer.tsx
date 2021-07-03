import { Spin } from 'antd';
import { FC } from 'react';
import { useGetMediaTweetsFromUserQuery } from '../generated/graphql';
import { TweetCard } from './TweetCard';

export const UserMediaTweetsContainer: FC<{ username: string }> = ({
  username,
}) => {
  const { data, loading } = useGetMediaTweetsFromUserQuery({
    variables: { username },
  });
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
      ) : (
        data?.getMediaTweetsFromUser.map((tweet) => (
          <TweetCard tweet={tweet} key={tweet.id} />
        ))
      )}
    </>
  );
};
