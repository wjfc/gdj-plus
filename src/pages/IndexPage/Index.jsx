import React, { PureComponent } from 'react';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import styles from './Index.less';

class Indexpage extends PureComponent {
	componentDidMount() {}

	componentWillUnmount() {}
	render() {
		return (
			<div className={styles.indexPage}>
				<section className={styles.banner}>
					<MiddleHeader bgColor={'blue'} />
				</section>
			</div>
		);
	}
}
export default Indexpage;
