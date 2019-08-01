import React, { PureComponent } from 'react';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import styles from './ActivityService.less';

class MessageService extends PureComponent {
	componentDidMount() {}

	componentWillUnmount() {}
	render() {
		return (
			<div className={styles.messagePage}>
				<MiddleHeader />
			</div>
		);
	}
}
export default MessageService;
