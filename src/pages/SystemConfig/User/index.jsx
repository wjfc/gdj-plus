import { Button, Card, Icon, List, Typography, Modal, Form, Input } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const { Paragraph } = Typography;

const getModalContent = () => {};

@connect(({ systemConfigUser, loading }) => ({
  systemConfigUser,
  loading: loading.models.list,
}))
@Form.create()
class User extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemConfigUser/fetch',
      payload: {},
    });
  }

  render() {
    const {
      systemConfigUser: { list },
      loading,
    } = this.props;

    const nullData = {};
    return (
      <PageHeaderWrapper>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 24,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            dataSource={[nullData, ...list]}
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1">修改</a>, <a key="option2">删除</a>]}
                    >
                      <Card.Meta
                        title={<a>{item.name}</a>}
                        description={
                          <Paragraph
                            className={styles.item}
                            ellipsis={{
                              rows: 3,
                            }}
                          >
                            {item.mobile}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }

              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新增账户
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default User;
