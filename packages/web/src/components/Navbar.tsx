import { FC, useEffect } from 'react';
import { Avatar, Menu, Dropdown, Button, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import styles from '../styles/navbar.module.scss';
import { DownOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useStore } from '../lib/store';
import { useMeQuery } from '../generated/graphql';

export const Navbar: FC = () => {
  const r = useRouter();
  const isCurrPage = (path: string) =>
    r.pathname === path ? `${styles.tab} ${styles.tab_underline}` : styles.tab;
  const { isLogged, setUser, logout, user } = useStore((s) => s);

  const { data, loading } = useMeQuery({
    skip: typeof window === undefined,
  });

  const handleLogout = () => {
    localStorage.removeItem('token:tweeter');
    logout();
  };

  useEffect(() => {
    if (!loading && data?.me) {
      setUser(data.me);
    }
  }, [loading, isLogged, logout]);

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
      <Menu.Item key="2" style={{ color: 'red' }} onClick={handleLogout}>
        <LoginOutlined />
        <span style={{ marginLeft: '5px' }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

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
            <Avatar shape="square" src={user?.avatar} />
            <span>@{user?.username}</span>
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
