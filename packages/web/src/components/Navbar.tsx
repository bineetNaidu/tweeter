import { FC, useEffect } from 'react';
import { Avatar, Menu, Dropdown, Button, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import styles from '../styles/navbar.module.scss';
import { DownOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useStore } from '../lib/store';
import { useMeQuery } from '../generated/graphql';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link href="/profile">
        <div>
          <UserOutlined />
          <span style={{ marginLeft: '5px' }}>Profile</span>
        </div>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" style={{ color: 'red' }}>
      <LoginOutlined />
      <span style={{ marginLeft: '5px' }}>Logout</span>
    </Menu.Item>
  </Menu>
);

export const Navbar: FC = () => {
  const r = useRouter();
  const isCurrPage = (path: string) =>
    r.pathname === path ? `${styles.tab} ${styles.tab_underline}` : styles.tab;
  const { isLogged, setUser } = useStore((s) => s);

  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading && data?.me) {
      setUser(data.me);
    }
  }, [loading, isLogged]);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Title className={styles.navbar__logo} level={2}>
        Tweeter
      </Title>
      <div className={styles.navbar__tabs}>
        <Link href="/">
          <div className={isCurrPage('/')}>Home</div>
        </Link>
        <Link href="/explore">
          <div className={isCurrPage('/explore')}>Expore</div>
        </Link>
        <Link href="/bookmarks">
          <div className={isCurrPage('/bookmarks')}>Bookmarks</div>
        </Link>
      </div>
      <div className={styles.navbar__profile}>
        {isLogged ? (
          <>
            <Avatar
              shape="square"
              src="https://avatars.githubusercontent.com/u/66471461?s=400&u=6f64e73da3c61019dd5f3d60b3d13a8591568b6e&v=4"
            />
            <span>Bineet Naidu</span>
            <Dropdown overlay={menu} trigger={['click']}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <DownOutlined />
              </a>
            </Dropdown>
          </>
        ) : !loading ? (
          <>
            <Link href="/login">
              <Button style={{ marginRight: '5px' }}>Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </>
        ) : (
          <Spin />
        )}
      </div>
    </nav>
  );
};
