import { queryCurrent } from '@/services/user';
import { setLongToken } from '@/utils/longToken';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(queryCurrent, id);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;
      yield put({
        type: 'saveCurrentUser',
        payload: data.data.roleList[0],
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
