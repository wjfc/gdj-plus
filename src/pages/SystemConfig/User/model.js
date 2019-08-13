import { queryUsersPage } from '@/services/user';
import { setLongToken } from '@/utils/longToken';
const Model = {
  namespace: 'systemConfigUser',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsersPage, payload);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;
      yield put({
        type: 'queryList',
        payload: data.data,
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload.list };
    },
  },
};
export default Model;
