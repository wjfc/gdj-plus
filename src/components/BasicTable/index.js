import React, { PureComponent, Fragment, Children } from 'react';
import { Table, Alert, Badge } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}
@connect()
class BasicTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      data,
      subTitle,
      paginationProps,
      handleBtnClicks,
      dispatch,
      children,
      rowKey,
      btnBottom,
      ...rest
    } = this.props;
    const ButtonBottom = btnBottom;

    return (
      <div className={styles.BasicTable}>
        <Table
          dataSource={data.dataList}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          rowKey={rowKey}
          {...rest}
        />
        {ButtonBottom && <ButtonBottom handleBtnClicks={handleBtnClicks} />}
      </div>
    );
  }
}

export default BasicTable;
