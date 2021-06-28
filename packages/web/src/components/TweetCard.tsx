import { FC } from 'react';
import { BaseTweetFragment } from '../generated/graphql';
import { Avatar, Image } from 'antd';
import styles from '../styles/tweetCard.module.scss';

interface Props {
  tweet: BaseTweetFragment;
}

export const TweetCard: FC<Props> = ({ tweet }) => {
  return (
    <div className={styles.tweetCard}>
      <div className={styles.tweetCard__header}>
        <Avatar src={tweet.author.avatar} alt={tweet.author.username} />
        <div className={styles.header__meta}>
          <span>{tweet.author.username}</span>
          <span>{new Date(tweet.createdAt).toUTCString()}</span>
        </div>
      </div>

      <div className={styles.tweetCard__body}>
        <p>{tweet.body}</p>
        {tweet.has_media ? <Image width={'100%'} src={tweet.media!} /> : null}
      </div>

      <div className={styles.tweetCard__footer}></div>
    </div>
  );
};
