import React, { PureComponent } from 'react';
import { Button, Row, Col } from 'antd';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import ContentTop from '@/components/IndexPage/ContentTop';
import 'animate.css';
import styles from './DataDevService.less';
import ds1 from '@/assets/indexPageImg/ds1.png';
import ds2 from '@/assets/indexPageImg/ds2.png';
import ds3 from '@/assets/indexPageImg/ds3.png';

function DsCard(props) {
	const { title, imgUrl, content } = props;
	return (
		<div className={styles.dsCard}>
			<img src={imgUrl} alt="" />
			<div className={styles.dsInfo}>
				<h3>{title}</h3>
				<p>{content}</p>
			</div>
		</div>
	);
}

class dsService extends PureComponent {
	componentDidMount() {}

	componentWillUnmount() {}
	render() {
		return (
			<div className={styles.dataServicePage}>
				<MiddleHeader />
				<section className={styles.dsContent}>
					<ContentTop
						title="数据开放服务"
						content="将吴江广电+平台的广电基础能力、互联网能力和政务能力进行封装，并向政企级客户提供开放的，标准化的WebService或者Web2.0接口，持续地为客户提供能力支撑。"
						handleClick={() => {
							alert(3);
						}}
					/>
					<div className={styles.dsBottom}>
						<div className="animated fadeInLeft">
							<DsCard
								imgUrl={ds2}
								title="互联网能力"
								content="统合封装互联网能力资源，如天气、位置、归属地信息等，让客户根据需求灵活调用相应互联网能力。"
							/>
						</div>
						<div className="animated fadeInDown">
							<DsCard
								imgUrl={ds3}
								title="广电基础能力"
								content="提供如用户信息对接、消息推送、短信平台等吴江广电内部基础能力，让广电内部资源促进业务发展。"
							/>
						</div>
						<div className="animated fadeInRight">
							<DsCard imgUrl={ds1} title="政务能力" content="与政府相应信息系统完成对接，为政企客户提供医疗、教育等政务能力和便民服务。" />
						</div>
					</div>
				</section>
			</div>
		);
	}
}
export default dsService;
