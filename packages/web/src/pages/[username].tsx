import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import { useUserQuery } from '../generated/graphql';
import { withApollo } from '../lib/withApollo';
import { Spin, Avatar, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import styles from '../styles/users.module.scss';

const Users = () => {
  const fallbackImg =
    'https://images.unsplash.com/photo-1623855526629-73cc3206c47a?ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&ixlib=rb-1.2.1&dpr=1&auto=format%2Ccompress&fit=crop&w=8599&h=594%201x,%20https://images.unsplash.com/photo-1623855526629-73cc3206c47a?ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&ixlib=rb-1.2.1&dpr=2&auto=format%2Ccompress&fit=crop&w=8599&h=594%202x';
  const r = useRouter();
  const { data, loading } = useUserQuery({
    variables: { username: (r.query.username as string).replace('@', '') },
  });
  return (
    <div>
      <Navbar />
      {!loading && data?.user ? (
        <div className={styles.users}>
          <img
            className={styles.users__banner}
            src={data.user.banner || fallbackImg}
            alt={data.user.first_name + "'s banner"}
          />

          <div className={styles.users__data}>
            <Avatar
              className={styles.avatar}
              shape="square"
              size="large"
              style={{ borderRadius: 5 }}
              src={data.user.avatar}
              alt={data.user.username}
            />
            <div className={styles.metadata}>
              <div className={styles.meta}>
                <div className={styles.meta_upper}>
                  <span className={styles.names}>
                    {data.user.first_name} {data.user.last_name}
                  </span>
                  <p className={styles.ffs}>
                    <span>1064</span>
                    <span>Following</span>
                  </p>
                  <p className={styles.ffs}>
                    <span>154</span>
                    <span>Followers</span>
                  </p>
                </div>
                <Button type="primary">
                  <UserAddOutlined /> Follow
                </Button>
              </div>
              <p className={styles.bio}>{data.user.bio ?? 'No Bio!'}</p>
            </div>
          </div>
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default withApollo({ ssr: true })(Users);
