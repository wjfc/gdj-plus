import React, { PureComponent } from 'react';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import Link from 'umi/link';
import styles from './TopHeader.less';
const { Header } = Layout;

class HeaderView extends PureComponent {
	componentDidMount() {}

	componentWillUnmount() {}
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
					<Menu.Item key="login">
						<Icon type="login" />
						登录
					</Menu.Item>
				</Menu>
			</Header>
		);
	}
}
export default HeaderView;
