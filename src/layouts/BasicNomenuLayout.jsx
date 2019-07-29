/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Layout } from 'antd';

import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import { isAntDesignPro } from '@/utils/utils';
import HeaderView from '@/components/GlobalHeader/TopHeader';

/**
 * use Authorized check all menu item
 */
const { Content } = Layout;
const menuDataRender = (menuList) => {
	return [];
};

const footerRender = (_, defaultDom) => {
	if (!isAntDesignPro()) {
		return defaultDom;
	}

	return (
		<div>
			{defaultDom}
			<div
				style={{
					padding: '0px 24px 24px',
					textAlign: 'center'
				}}
			>
				<a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
					<img
						src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
						width="82px"
						alt="netlify logo"
					/>
				</a>
			</div>
		</div>
	);
};

const BasicLayout = (props) => {
	const { dispatch, children, settings } = props;
	/**
   * constructor
   */

	useEffect(() => {
		if (dispatch) {
			dispatch({
				type: 'user/fetchCurrent'
			});
			dispatch({
				type: 'settings/getSetting'
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
			<Content>
				<MiddleHeader bgColor={'bgWhite'} />
				<div style={{ padding: '24px 40px' }}>{children}</div>
			</Content>
		</Layout>
	);
};

export default connect(({ global, settings }) => ({
	collapsed: global.collapsed,
	settings
}))(BasicLayout);
