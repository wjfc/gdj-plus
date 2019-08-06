/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import ProLayout from '@ant-design/pro-layout';
import { Layout } from 'antd';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import FooterView from '../components/GlobalFooter/Footer';
import HeaderView from '@/components/GlobalHeader/TopHeader';
import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/logo.jpg';
import styles from './BasicLayout.less';
const { check } = Authorized;

/**
 * use Authorized check all menu item
 */
const myMenuDates = JSON.parse(localStorage.getItem('permissionVOS'));
console.log(myMenuDates);
var menuData = [
	{
		path: '/messageCenter',
		name: '消息中心',
		icon: 'bell',
		children: [
			{
				path: '/messageCenter/station',
				name: '站内消息',
				exact: true
			},
			{
				path: '/messageCenter/all',
				name: '所有消息',
				exact: true
			},
			{
				path: '/messageCenter/unread',
				name: '未读消息',
				exact: true
			},
			{
				path: '/messageCenter/readed',
				name: '已读消息',
				exact: true
			}
		]
	}
];
const menuDataRender = (menuList) => {
	return menuData;
	// console.log(menuList);
	// return menuList.map((item) => {
	// 	const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
	// 	return Authorized.check(item.authority, localItem, null);
	// });
};

const BasicLayout = (props) => {
	const { dispatch, children, settings, route: { routes, path, authority }, menuData2 } = props;
	console.log(menuData2);
	/**
   * constructor
   */

	useEffect(() => {
		if (dispatch) {
			dispatch({
				type: 'settings/getSetting'
			});
			dispatch({
				type: 'menu/getMenuData',
				payload: { routes, path, authority, menuData }
			});
		}
	}, []);
	/**
   * init variables
   */

	const handleMenuCollapse = (payload) =>
		dispatch &&
		dispatch({
			type: 'global/changeLayoutCollapsed',
			payload
		});

	return (
		<Layout>
			<HeaderView />
			<ProLayout
				logo={logo}
				onCollapse={handleMenuCollapse}
				menuItemRender={(menuItemProps, defaultDom) => {
					if (menuItemProps.isUrl) {
						return defaultDom;
					}

					return <Link to={menuItemProps.path}>{defaultDom}</Link>;
				}}
				breadcrumbRender={(routers = []) => [
					{
						path: '/',
						breadcrumbName: formatMessage({
							id: 'menu.home',
							defaultMessage: 'Home'
						})
					},
					...routers
				]}
				itemRender={(route, params, routes, paths) => {
					const first = routes.indexOf(route) === 0;
					return first ? (
						<Link to={paths.join('/')}>{route.breadcrumbName}</Link>
					) : (
						<span>{route.breadcrumbName}</span>
					);
				}}
				footerRender={false}
				menuDataRender={
					menuData2 ? (
						() => {
							return menuData2;
						}
					) : (
						false
					)
				}
				// menuDataRender={menuDataRender}
				// formatMessage={formatMessage}
				rightContentRender={(rightProps) => <RightContent {...rightProps} />}
				{...props}
				{...settings}
			>
				{children}
			</ProLayout>
			{/*	<FooterView />*/}
		</Layout>
	);
};

export default connect(({ global, settings, menu: menuModel }) => ({
	collapsed: global.collapsed,
	settings,
	menuData2: menuModel.menuData2
}))(BasicLayout);
