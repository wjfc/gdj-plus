import React, { PureComponent } from 'react';
import { Button, Row, Col } from 'antd';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import ContentTop from '@/components/IndexPage/ContentTop';
import 'animate.css';
import styles from './VideoService.less';
import video1 from '@/assets/indexPageImg/video1.png';
import video2 from '@/assets/indexPageImg/video2.png';
import video3 from '@/assets/indexPageImg/video3.png';
function VideoCard(props) {
	const { title, imgUrl, content } = props;
	return (
		<div className={styles.vsCard}>
			<img src={imgUrl} alt="" />
			<div>
				<h3>{title}</h3>
				<p>{content}</p>
			</div>
		</div>
	);
}

class VideoService extends PureComponent {
	columns = {
		xs: {
			span: 24
		},
		sm: {
			span: 24
		},
		md: {
			span: 24
		},
		lg: {
			span: 24
		},
		xl: {
			span: 12
		},
		xxl: {
			span: 12
		}
	};
	componentDidMount() {}

	componentWillUnmount() {}
	render() {
		return (
			<div className={styles.videoPage}>
				<MiddleHeader />
				<section className={styles.videoContent}>
					<ContentTop
						title="视频服务"
						content="视频的传、转、送、播四个关键节点，分别采用行内顶尖的安全技术，高效的视频转码技术、极速的CDN网络、交互式的播放应用，满足客户全方位的视频政企级应用场景。"
						handleClick={() => {
							alert(2);
						}}
					/>
					<div className={styles.videoBottom}>
						<Row gutter={20} className={styles.videoBotBox}>
							<Col {...this.columns} className={`${styles.videoBotCol} animated fadeInLeft `}>
								<div className={styles.VideoCardBox}>
									<VideoCard
										title="多格式上传"
										content="支持*.mp4;*.flv;*.ts等多格式上传，支持断点续传、大文件上传。"
										imgUrl={video1}
									/>
									<VideoCard
										title="统一加工"
										content="统一转码注入，采用队列控制运算，依照硬件负载动态调节，确保系统时刻处于高效状态。
"
										imgUrl={video2}
									/>
								</div>
							</Col>
							<Col {...this.columns} className={`${styles.videoBotCol} animated fadeInRight `}>
								<div className={styles.plugFlow}>
									<div className={styles.plugFlowPoster} />
									<VideoCard
										title="统一存储推流"
										content="存储系统采用分布式架构；关键数据库采用冗余架构，保障关键数据不丢失，智能切换最优线路。
"
										imgUrl={video3}
									/>
								</div>
							</Col>
						</Row>
					</div>
				</section>
			</div>
		);
	}
}
export default VideoService;
