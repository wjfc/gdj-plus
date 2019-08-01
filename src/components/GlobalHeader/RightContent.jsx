import { Icon, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { NavLink } from 'dva/router';
import { formatMessage } from 'umi-plugin-react/locale';

import styles from './index.less';

const GlobalHeaderRight = (props) => {
	const { layout } = props;
	let className = styles.right;

	return (
		<div className={className}>
			<NavLink
				to="/indexPage/messageService"
				activeStyle={{
					color: '#1188FF'
				}}
			>
				信息服务
			</NavLink>
			<NavLink
				to="/indexPage/videoService"
				activeStyle={{
					color: '#1188FF'
				}}
			>
				视频服务
			</NavLink>
			<NavLink
				to="/indexPage/activityService"
				activeStyle={{
					color: '#1188FF'
				}}
			>
				互助活动服务
			</NavLink>
			<NavLink
				to="/indexPage/dataDevService"
				activeStyle={{
					color: '#1188FF'
				}}
			>
				数据开发服务
			</NavLink>
		</div>
	);
};

export default connect(({ settings }) => ({}))(GlobalHeaderRight);
