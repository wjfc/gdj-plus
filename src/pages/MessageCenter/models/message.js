import { routerRedux } from 'dva/router';
import { message, notification } from 'antd';

import { getMessageByType, updateMessageById, deleteMessageById } from '@/services/message.js';

export default {
  namespace: 'message',

  state: {},

  effects: {
    *getMessageByType({ payload }, { call, put }) {
      const response = yield call(getMessageByType, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *updateMessageById({ payload, callback }, { call, put }) {
      const response = yield call(updateMessageById, payload);
      callback(response);
    },
    *deleteMessageById({ payload, callback }, { call, put }) {
      const response = yield call(deleteMessageById, payload);

      callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        result: action.payload,
      };
    },
  },
};
