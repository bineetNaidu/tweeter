import { FC } from 'react';
import {
  BaseTweetFragment,
  useDeleteTweetMutation,
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

interface Props {
  tweet: BaseTweetFragment;
}

export const TweetCard: FC<Props> = ({ tweet }) => {
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
      </div>

      <div className={styles.tweetCard__footer}>
        <button>
          <MessageOutlined /> Comment
        </button>
        <button>
          <RetweetOutlined /> Retweet
        </button>
        <button>
          <HeartOutlined /> Like
        </button>
        <button>
          <SaveOutlined /> Save
        </button>
      </div>
    </div>
  );
};
