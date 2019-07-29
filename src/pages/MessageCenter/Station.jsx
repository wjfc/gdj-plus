import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

@connect()
class MessageStaion extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <p style={{ height: '1000px' }}>站内消息内容！</p>
      </PageHeaderWrapper>
    );
  }
}
export default MessageStaion;
