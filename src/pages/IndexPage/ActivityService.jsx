import React, { PureComponent } from 'react';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import ContentTop from '@/components/IndexPage/ContentTop';
import { Icon } from 'antd';
import styles from './ActivityService.less';
import activityPoster from '@/assets/indexPageImg/activityPoster.png';

function AsCard(props) {
	const { title, color } = props;
	return (
		<div className={styles.cardBox}>
			<Icon type="check" className={styles.icon} style={{ color: color }} />
			<p>{title}</p>
		</div>
	);
}

class ActivityService extends PureComponent {
	state = {
		asData: [
			{
				color: '#333',
				title: '互动活动服务'
			},
			{
				color: '#333',
				title: '大数据可视化分析内容'
			},
			{
				color: '#333',
				title: '精准统计内容'
			},
			{
				color: '#333',
				title: '提升市场活动和营销效率'
			}
		]
	};
	componentDidMount() {
		const { asData } = this.state;
		var _asData = JSON.parse(JSON.stringify(asData));

		for (let i = 0; i < asData.length; i++) {
			setTimeout(() => {
				_asData[i].color = '#009AFF';
				this.setState(
					{
						asData: _asData
					},
					() => {
						this.forceUpdate();
					}
				);
			}, 250 * i);
		}
	}
	updateAsData = () => {};
	componentWillUnmount() {}
	render() {
		const { asData } = this.state;
		return (
			<div className={styles.activityServicePage}>
				<MiddleHeader />
				<div className={styles.asContent}>
					<img src={activityPoster} alt="" />
					<div className={styles.asContentRight}>
						<ContentTop
							title="数据开放服务"
							content="可跨渠道、跨终端帮助客户完成营销全过程整合管理，全程数据追踪，实现客户洞察提高营销效果"
							handleClick={() => {}}
						/>
						<div className={styles.asContentBottom}>
							<ul className={styles.asList}>
								{asData.map((v, i) => {
									return (
										<li key={i}>
											<AsCard title={v.title} color={v.color} />
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ActivityService;
