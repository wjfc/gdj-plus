import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox, Alert, Modal, Icon, Button, Row, Col, Form, Input } from 'antd';
import CryptoJS from 'crypto-js/md5';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './Login.less';
import loginBg from '@/assets/indexPageImg/loginBg.png';
const FormItem = Form.Item;
@connect(({ loading }) => ({ isLoading: loading.effects['login/login'] }))
@Form.create()
class LoginPage extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;

        dispatch({
          type: 'login/login',
          payload: {
            loginName: values.username,
            password: CryptoJS(values.password).toString(),
            code: 1,
            systemId: 2,
          },
        });
      }
    });
  };
  render() {
    const { isLoading } = this.props;

    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.main}>
        <img src={loginBg} alt="" />
        <div className={styles.login}>
          <h3>吴江广电+</h3>
          <p>欢迎登录“智慧吴江”广电+全业务平台</p>
          <Form onSubmit={this.handleSubmit} className={styles.loginFrom}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="帐号"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              block
              loading={isLoading}
            >
              登录
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
