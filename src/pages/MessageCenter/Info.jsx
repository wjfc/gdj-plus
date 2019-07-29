import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

@connect()
class MessageInfo extends PureComponent {
	render() {
		return <p>消息内容详情！！！！！！</p>;
	}
}
export default MessageInfo;
