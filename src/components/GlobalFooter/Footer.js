import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './Footer.less';
const { Footer } = Layout;
const FooterView = () => (
  <Footer className="pageFooter">
    <GlobalFooter
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" />
          江苏有线网络发展有限责任公司吴江分公司 版权所有 苏ICP备16034469号-1
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
