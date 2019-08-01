import React, { Component, PureComponent } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { Table, Badge, Menu, PageHeader, Button, Modal, Icon } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import BasicTable from '@/components/BasicTable';
import styles from './All.less';

const ButtonBottom = (props) => {
	const { handleBtnClicks } = props;

	return (
		<div className={styles.btnBottom}>
			<Button className={styles.btn} onClick={handleBtnClicks[0]}>
				删除
			</Button>
			<Button className={styles.btn} onClick={handleBtnClicks[1]}>
				标记已读
			</Button>
			<Button className={styles.btn} onClick={handleBtnClicks[2]}>
				全部删除
			</Button>
			<Button className={styles.btn} onClick={handleBtnClicks[3]}>
				全部已读
			</Button>
		</div>
	);
};
@connect(({ message, loading }) => {
	return { message, isFeatch: loading.effects['message/getMessageByType'] };
})
class MessageStaion extends PureComponent {
	state = {
		selectedRowKeys: [],
		pagination: { current: 1, pageSize: 10 },
		// modal框配置属性
		modal: {
			title: '',
			visible: false,
			content: '',
			onOk: () => {},
			onCancel: () => {}
		}
	};
	columns = [
		{
			title: '消息标题',
			dataIndex: 'title',
			align: 'center',
			render: (val, v) => {
				return v.status !== 0 ? (
					<a
						style={{ color: 'rgba(0, 0, 0, 0.65)' }}
						onClick={() => {
							router.push(`/messageCenter/info?id=${v.id}`);
						}}
					>
						{val}
					</a>
				) : (
					<a
						onClick={() => {
							router.push(`/messageCenter/info?id=${v.id}`);
						}}
					>
						<Badge status={'blue'} text={val} />
					</a>
				);
			}
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			align: 'center',
			render: (val) => `${moment(val).format('YYYY-MM-DD h:mm:ss')}`,
			sorter: true
		},
		{
			title: '消息类型',
			dataIndex: 'type',
			align: 'center',
			render: (val) => `${val}`
		}
	];

	componentDidMount() {
		const { dispatch } = this.props;

		const params = {
			pageNum: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize
		};
		requestAnimationFrame(() => {
			dispatch({
				type: 'message/getMessageByType',
				payload: params
			});
		});
	}

	handleBasicTableChange = (pagination, filtersArg, sorter) => {
		const { dispatch } = this.props;
		const params = {
			pageNum: pagination.current,
			pageSize: pagination.pageSize
		};
		this.setState({
			pagination: {
				current: pagination.current,
				pageSize: pagination.pageSize
			}
		});
		if (sorter.field) {
			const order = sorter.order === 'ascend' ? 1 : 0; //升序1降序0
			params.sorter = `${sorter.field}_${order}`;
		}
		dispatch({
			type: 'message/getMessageByType',
			payload: params
		});
	};
	// 表单pageSize 变化的回调
	handleBasicSizeChange = (current, size) => {
		this.setState({
			pagination: {
				current,
				pageSize: size
			}
		});
	};
	handleBtnDel = () => {
		// 删除按钮
		const { dispatch } = this.props;
		const { selectedRowKeys } = this.state;
		if (selectedRowKeys.length < 1) return false;

		let modal = Object.assign(
			{},
			this.state.modal,
			{ visible: true },
			{
				title: (
					<div>
						<Icon
							type="exclamation-circle"
							theme="twoTone"
							twoToneColor="#f5222d"
							style={{ marginRight: '14px' }}
						/>
						<span>删除</span>
					</div>
				)
			},
			{ content: `您确定要删除已选择的${selectedRowKeys.length}条消息已读吗？` },
			{
				onOk: () => {
					alert(111);
					// 需要改成删除接口，还未改。
					dispatch({
						type: 'message/deleteMessageById',
						payload: { ids: selectedRowKeys.toString() },
						callback: (res) => {
							if (res.code !== 0) return;
							this.setState({
								modal: { title: '', content: '', visible: false, onOk: () => {}, onCancel: () => {} }
							});
							const params = {
								pageNum: this.state.pagination.current,
								pageSize: this.state.pagination.pageSize
							};
							this.setState({ selectedRowKeys: [] });
							dispatch({
								type: 'message/getMessageByType',
								payload: params
							});
						}
					});
				}
			},
			{
				onCancel: () => {
					this.setState({
						modal: { title: '', content: '', visible: false, onOk: () => {}, onCancel: () => {} }
					});
				}
			}
		);
		this.setState({
			modal: modal
		});
	};
	handleBtnDelAll = () => {
		const { dispatch } = this.props;
		alert('删除all');
	};
	handleBtnRead = () => {
		// 标记已读按钮
		const { dispatch } = this.props;
		const { selectedRowKeys } = this.state;
		if (selectedRowKeys.length < 1) return false;

		let modal = Object.assign(
			{},
			this.state.modal,
			{ visible: true },
			{
				title: (
					<div>
						<Icon
							type="exclamation-circle"
							theme="twoTone"
							twoToneColor="#FAAD14"
							style={{ marginRight: '14px' }}
						/>
						<span>标记已读</span>
					</div>
				)
			},
			{ content: `您确定要标记已选择的${selectedRowKeys.length}条消息已读吗？` },
			{
				onOk: () => {
					dispatch({
						type: 'message/updateMessageById',
						payload: { ids: selectedRowKeys.toString() },
						callback: (res) => {
							if (res.code !== 0) return;
							this.setState({
								modal: { title: '', content: '', visible: false, onOk: () => {}, onCancel: () => {} }
							});
							const params = {
								pageNum: this.state.pagination.current,
								pageSize: this.state.pagination.pageSize
							};
							this.setState({ selectedRowKeys: [] });
							dispatch({
								type: 'message/getMessageByType',
								payload: params
							});
						}
					});
				}
			},
			{
				onCancel: () => {
					this.setState({
						modal: { title: '', content: '', visible: false, onOk: () => {}, onCancel: () => {} }
					});
				}
			}
		);
		this.setState({
			modal: modal
		});
	};

	handleBtnReadAll = () => {
		alert('已读all');
	};

	handleMenuClick = () => {
		const { dispatch } = this.props;
		const { pagination } = this.state;
		this.setState(
			{
				pagination: {
					current: 1,
					pageSize: pagination.pageSize
				}
			},
			() => {
				const params = {
					pageNum: this.state.pagination.current,
					pageSize: this.state.pagination.pageSize
				};
				dispatch({
					type: 'message/getMessageByType',
					payload: params
				});
			}
		);
	};
	renderTable = () => {
		const { message, isFeatch } = this.props;

		const { pagination } = this.state;
		const data = message.result ? message.result : null;
		if (data) {
			var showTable = true;
			var { pageInfo } = data;
			var paginationProps = {
				showSizeChanger: true,
				showQuickJumper: true,
				total: pageInfo ? pageInfo.totalCount : 0,
				showLessItems: true,
				onShowSizeChange: this.handleBasicSizeChange,
				...pagination
			};
			// 控制表格的复选框
			var rowSelection = {
				selectedRowKeys: this.state.selectedRowKeys,
				onChange: (selectedRowKeys, selectedRows) => {
					this.setState({
						selectedRowKeys
					});
				},
				getCheckboxProps: (record) => ({
					// 选择框的默认属性配置
					disabled: record.name === 'Disabled User', // Column configuration not to be checked
					name: record.name
				})
			};

			return (
				<BasicTable
					rowKey="id"
					columns={this.columns}
					data={data}
					rowSelection={rowSelection}
					onChange={this.handleBasicTableChange}
					paginationProps={paginationProps}
					btnBottom={ButtonBottom}
					loading={isFeatch}
					handleBtnClicks={[
						this.handleBtnDel,
						this.handleBtnRead,
						this.handleBtnDelAll,
						this.handleBtnReadAll
					]}
				/>
			);
		} else {
			return (
				<BasicTable
					rowKey="id"
					columns={this.columns}
					data={[]}
					rowSelection={rowSelection}
					onChange={this.handleBasicTableChange}
					paginationProps={paginationProps}
					btnBottom={ButtonBottom}
					handleBtnClicks={[
						this.handleBtnDel,
						this.handleBtnRead,
						this.handleBtnDelAll,
						this.handleBtnReadAll
					]}
				/>
			);
		}
	};
	render() {
		const { title, visible, content, onOk, onCancel } = this.state.modal;

		return (
			<PageHeaderWrapper>
				<Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
					{content}
				</Modal>
				<Menu mode="horizontal" defaultSelectedKeys={[ 'all' ]}>
					<Menu.Item key="all" onClick={this.handleMenuClick}>
						全部类型
					</Menu.Item>
					<Menu.Item key="notice" onClick={this.handleMenuClick}>
						公告消息
					</Menu.Item>
					<Menu.Item key="operate" onClick={this.handleMenuClick}>
						运营消息
					</Menu.Item>
					<Menu.Item key="error" onClick={this.handleMenuClick}>
						故障消息
					</Menu.Item>
				</Menu>
				{this.renderTable()}
			</PageHeaderWrapper>
		);
	}
}
export default MessageStaion;
