import RightContent from './RightContent';
import logo from '@/assets/logo.jpg';
import styles from './MiddleHeader.less';
const TopLogo = () => {
	return (
		<div className={styles.topLogo}>
			<a>
				{/**<img src={logo} alt="logo" /> */}
				<h1>吴江广电+</h1>
			</a>
		</div>
	);
};

const MiddleHeader = (props) => {
	const { bgColor } = props;

	return (
		<div className={`${bgColor} ${styles.middleHeader}`}>
			<TopLogo />
			<RightContent />
		</div>
	);
};
export default MiddleHeader;
