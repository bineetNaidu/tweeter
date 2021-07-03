import { Spin } from 'antd';
import { FC } from 'react';
import { useGetLikeTweetsFromUserQuery } from '../generated/graphql';
import { TweetCard } from './TweetCard';

export const UserLikeTweetsContainer: FC<{ username: string }> = ({
  username,
}) => {
  const { data, loading } = useGetLikeTweetsFromUserQuery({
    variables: { username },
  });
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
      ) : (
        data?.getLikeTweetsFromUser.map((like) => (
          <TweetCard tweet={like.tweet} key={like.id} />
        ))
      )}
    </>
  );
};
