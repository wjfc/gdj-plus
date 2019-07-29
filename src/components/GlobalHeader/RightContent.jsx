import { Icon, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { formatMessage } from 'umi-plugin-react/locale';

import styles from './index.less';

const GlobalHeaderRight = (props) => {
	const { layout } = props;
	let className = styles.right;

	return (
		<div className={className}>
			<a href="https://www.baidu.com/" target="_blank">
				信息服务
			</a>
			<a href="http://www.baidu.com" target="_blank">
				视频服务
			</a>
			<a href="http://www.baidu.com" target="_blank">
				互助活动服务
			</a>
			<a href="http://www.baidu.com" target="_blank">
				数据开发服务
			</a>
		</div>
	);
};

export default connect(({ settings }) => ({}))(GlobalHeaderRight);
