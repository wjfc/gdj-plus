import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import Link from 'umi/link';

import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import styles from './Index.less';

class Indexpage extends PureComponent {
	componentDidMount() {}

	componentWillUnmount() {}
	render() {
		return (
			<div className={styles.indexPage}>
				<section className={styles.banner}>
					<MiddleHeader bgColor={'bg3273FE'} />
				</section>
			</div>
		);
	}
}
export default Indexpage;
