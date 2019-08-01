import React from 'react';
import { Layout } from 'antd';
import HeaderView from '@/components/GlobalHeader/TopHeader';
import FooterView from '../components/GlobalFooter/Footer';
import styles from './IndexLayout.less';
const { Content } = Layout;
const IndexLayout = ({ children }) => {
	return (
		<Layout>
			<HeaderView />
			<Content>
				<div className={styles.mainContent}> {children}</div>
			</Content>
			<FooterView />
		</Layout>
	);
};

export default IndexLayout;
