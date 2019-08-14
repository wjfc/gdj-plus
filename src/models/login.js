import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { setAuthority, getAuthority } from '@/utils/authority';
import { setLongToken } from '@/utils/longToken';
import { fakeAccountLogin } from '@/services/user';
import { reloadAuthorized } from '@/utils/Authorized';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      localStorage.setItem('loginName', payload.loginName);
      localStorage.setItem('password', payload.password);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.errorCode === 0) {
        reloadAuthorized();
        // 默认跳转到的页面，线上可配置成首页。
        yield put(routerRedux.replace('/'));
      } else {
        notification.error({
          message: '提示信息',
          description: (response && response.errorMessage) || '系统错误',
        });
      }
    },
    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // 统一为admin
      if (payload.data.id) {
        setAuthority('admin');
        localStorage.setItem('userid', payload.data.id);
      } else {
        setAuthority('guest');
      }
      localStorage.setItem('permissionVOS', JSON.stringify(payload.data.menuList));

      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
