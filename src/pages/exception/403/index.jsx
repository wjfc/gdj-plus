import React from 'react';
import { Button, Result } from 'antd';
import Link from 'umi/link';

export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle={'抱歉，你无权访问该页面。'}
    extra={
      <Link to="/indexPage">
        <Button type="primary">返回首页</Button>
      </Link>
    }
  />
);
