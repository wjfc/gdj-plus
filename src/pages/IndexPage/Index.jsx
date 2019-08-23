import React, { PureComponent } from 'react';
import { connect } from 'dva';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import styles from './Index.less';
@connect()
class Indexpage extends PureComponent {
	componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
      payload: { id: localStorage.getItem('userid') },
    });
  }

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
