import { FC } from 'react';
import {
  Tweet,
  useDeleteTweetMutation,
  useLikeMutation,
} from '../generated/graphql';
import { Avatar, Image, Menu, Dropdown } from 'antd';
import {
  MoreOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  SaveOutlined,
  PushpinOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styles from '../styles/tweetCard.module.scss';
import { useStore } from '../lib/store';
import { CreateCommentForm } from './CreateCommentForm';
import { gql } from '@apollo/client';

interface Props {
  tweet: Tweet;
}

export const TweetCard: FC<Props> = ({ tweet }) => {
  const [like] = useLikeMutation();
  const { user, isLogged } = useStore();
  const [deleteTweet] = useDeleteTweetMutation();
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <PushpinOutlined /> Pin
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        style={{ color: 'red' }}
        key="3"
        onClick={async () => {
          await deleteTweet({
            variables: { id: tweet.id },
            update: (cache) => {
              cache.evict({ id: 'Tweet:' + tweet.id });
            },
          });
        }}
      >
        <DeleteOutlined /> Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.tweetCard}>
      <div className={styles.tweetCard__header}>
        <Avatar
          shape="square"
          size="large"
          style={{ borderRadius: 5 }}
          src={tweet.author.avatar}
          alt={tweet.author.username}
        />
        <div className={styles.header__meta}>
          <span>{tweet.author.username}</span>
          <span>{new Date(tweet.createdAt).toUTCString()}</span>
        </div>

        {isLogged && user?.id === tweet.author.id ? (
          <div className={styles.header_ctx}>
            <Dropdown overlay={menu} trigger={['click']}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <MoreOutlined />
              </a>
            </Dropdown>
          </div>
        ) : null}
      </div>

      <div className={styles.tweetCard__body}>
        <p>{tweet.body}</p>
        {tweet.has_media ? <Image width={'100%'} src={tweet.media!} /> : null}
        <div className={styles.tweet_metadata}>
          {tweet.likes.length > 0 && <span>{tweet.likes.length} likes</span>}
          {tweet.comments.length > 0 && (
            <span>{tweet.comments.length} comments</span>
          )}
        </div>
      </div>

      <div className={styles.tweetCard__footer}>
        <button>
          <MessageOutlined /> Comment
        </button>
        <button>
          <RetweetOutlined /> Retweet
        </button>
        <button
          style={tweet.likeStatus ? { color: 'red' } : undefined}
          onClick={async () => {
            await like({
              variables: { tweetId: tweet.id },
              update: (cache, { data }) => {
                cache.writeFragment({
                  id: 'Tweet:' + tweet.id,
                  fragment: gql`
                    fragment __ on Tweet {
                      id
                      likes {
                        id
                      }
                    }
                  `,
                  data: { id: tweet.id, likes: data?.like },
                });
              },
            });
          }}
        >
          <HeartOutlined /> Like
        </button>
        <button>
          <SaveOutlined /> Save
        </button>
      </div>
      {isLogged && user !== null ? (
        <CreateCommentForm tweetId={tweet.id} />
      ) : null}
    </div>
  );
};
