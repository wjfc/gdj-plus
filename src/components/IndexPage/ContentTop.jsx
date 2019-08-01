import React from 'react';
import { Button } from 'antd';
import styles from './ContentTop.less';
const ContentTop = (props) => {
	const { title, content, handleClick } = props;
	return (
		<div className={styles.contentTop}>
			<h3>{title}</h3>
			<p>{content}</p>
			<Button type="default" size="large" className={styles.btn} onClick={handleClick}>
				管理控制台
			</Button>
		</div>
	);
};
export default ContentTop;
