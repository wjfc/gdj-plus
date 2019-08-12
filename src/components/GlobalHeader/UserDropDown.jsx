import { Menu, Dropdown, Icon } from 'antd';
import React, { PureComponent } from 'react';
import Link from 'umi/link';
import styles from './UserDropDown.less';
const menu = (
  <Menu>
    <Menu.Item className={styles.userList}>
      <Link to="/user/resetPassword">
        <p className={styles.userMenu}>修改密码</p>
      </Link>
    </Menu.Item>
    <Menu.Item className={styles.userList}>
      <Link to="/user/login">
        <p className={styles.userMenu}>退出</p>
      </Link>
    </Menu.Item>
  </Menu>
);

class UserDropDown extends PureComponent {
  render() {
    const { userInfo } = this.props;
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          {userInfo.name} <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}
export default UserDropDown;
