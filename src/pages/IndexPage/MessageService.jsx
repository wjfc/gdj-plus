import React, { PureComponent } from 'react';
import { Button, Row, Col } from 'antd';
import MiddleHeader from '@/components/GlobalHeader/MiddleHeader';
import ContentTop from '@/components/IndexPage/ContentTop';
import 'animate.css';
import styles from './MessageService.less';

import message1 from '@/assets/indexPageImg/message1.png';
import message2 from '@/assets/indexPageImg/message2.png';
import message3 from '@/assets/indexPageImg/message3.png';

function MessageCard(props) {
	const { title, imgUrl, content } = props;
	return (
		<div className={styles.messageInfo}>
			<img src={imgUrl} alt="" />
			<h3>{title}</h3>
			<p>{content}</p>
		</div>
	);
}
class MessageService extends PureComponent {
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
			span: 8
		},
		xxl: {
			span: 8
		}
	};
	componentDidMount() {}

	componentWillUnmount() {}
	render() {
		return (
			<div className={styles.messagePage}>
				<MiddleHeader />
				<section className={styles.messageContent}>
					<ContentTop
						title="信息服务"
						content="吴江广电+内容管理系统是基于SaaS架构，利用J2EE和插件技术开发的网站内容管理软件，为政企客户提供Web内容统一的采集、创建、维护、发布和应用功能。"
						handleClick={() => {
							alert(1);
						}}
					/>
					<div className={styles.messageBottom}>
						<div className="animated fadeInDown">
							<MessageCard
								imgUrl={message1}
								title="多渠道采集"
								content="利用数据挖掘技术，从微信、微博、门户网页等互联网多渠道进行数据采集，为web内容的统一管理环节提供数据、资讯内容支撑。"
							/>
						</div>
						<div className="animated fadeInDown">
							<MessageCard
								imgUrl={message2}
								title="融合编辑"
								content="	提供了高度集成的融合编辑工作台，在此工作台下支持对图文、视频、专题等多媒体数据进行多功能编辑，支持文章编辑视图、区块视图、页面部件视图、回收站视图和评论视图等多维度的视图展现。"
							/>
						</div>

						<div className="animated fadeInDown">
							<MessageCard
								imgUrl={message3}
								title="统一发布"
								content="	系统支持电视端、PC端、移动客户端、html5等多终端平台的内容发布，能够将网站的文章、组图、视频、音频和专题等多种丰富的内容类型在不同终端进行展现，带给客户畅快淋漓的阅读体验。"
							/>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
export default MessageService;
