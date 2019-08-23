import React, { PureComponent } from 'react';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import UserDropDown from './UserDropDown';
import styles from './TopHeader.less';
const { Header } = Layout;
@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class HeaderView extends PureComponent {
  componentDidMount() {

  }

  componentWillUnmount() {}
  renderLastMenu = () => {
    const { currentUser } = this.props;
    if (currentUser && currentUser.name) {
      return <UserDropDown userInfo={currentUser} />;
    } else {
      return (
        <Link to="/user">
          <Icon type="login" />
          登录
        </Link>
      );
    }
  };
  render() {
    return (
      <Header className={styles.basicHeader}>
        <Menu mode="horizontal" className={styles.menu}>
          <Menu.Item key="console">
            <Link to="/manageConsole">
              <Icon type="desktop" />
              管理控制台
            </Link>
          </Menu.Item>
          <Menu.Item key="message">
            <Link to="/messageCenter">
              <Icon type="bell" />
              消息
            </Link>
          </Menu.Item>
          <Menu.Item key="login">{this.renderLastMenu()}</Menu.Item>
        </Menu>
      </Header>
    );
  }
}
export default HeaderView;
