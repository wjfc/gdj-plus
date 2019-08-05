import React, { PureComponent } from 'react';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import ContentTop from '@/components/IndexPage/ContentTop';
import styles from './ActivityService.less';
import activityPoster from '@/assets/indexPageImg/activityPoster.png';

class ActivityService extends PureComponent {
	componentDidMount() {}

	componentWillUnmount() {}
	render() {
		return (
			<div className={styles.activityServicePage}>
				<MiddleHeader />
				<div className={styles.asContent}>
					<img src={activityPoster} alt="" />
					<div className={styles.asContentRight}>
						<ContentTop
							title="数据开放服务"
							content="将吴江广电+平台的广电基础能力、互联网能力和政务能力进行封装，并向政企级客户提供开放的，标准化的WebService或者Web2.0接口，持续地为客户提供能力支撑。"
							handleClick={() => {
								alert(4);
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default ActivityService;
