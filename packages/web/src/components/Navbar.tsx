import { FC } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import Title from 'antd/lib/typography/Title';
import styles from '../styles/navbar.module.scss';
import { DownOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

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
  console.log(r);
  const isCurrPage = (path: string) =>
    r.pathname === path ? `${styles.tab} ${styles.tab_underline}` : styles.tab;
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Title className={styles.navbar__logo} level={2}>
        Tweeter
      </Title>
      <div className={styles.navbar__tabs}>
        <div className={isCurrPage('/')}>Home</div>
        <div className={isCurrPage('/expore')}>Expore</div>
        <div className={isCurrPage('/bookmarks')}>Bookmarks</div>
      </div>
      {/* Auth details */}
      <div className={styles.navbar__profile}>
        <Avatar
          shape="square"
          src="https://avatars.githubusercontent.com/u/66471461?s=400&u=6f64e73da3c61019dd5f3d60b3d13a8591568b6e&v=4"
        />
        <span>Bineet Naidu</span>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </nav>
  );
};
