import { routerRedux } from 'dva/router';
import { message, notification } from 'antd';

import { getMessageByType, updateMessageById, deleteMessageById } from '@/services/message.js';

export default {
	namespace: 'message',

	state: {},

	effects: {
		*getMessageByType({ payload }, { call, put }) {
			const response = yield call(getMessageByType, payload);
			const { data } = response;
			yield put({
				type: 'save',
				payload: data
			});
		},
		*updateMessageById({ payload, callback }, { call, put }) {
			const response = yield call(updateMessageById, payload);
			const { data } = response;
			callback(data);
		},
		*deleteMessageById({ payload, callback }, { call, put }) {
			const response = yield call(deleteMessageById, payload);
			const { data } = response;
			callback(data);
		}
	},

	reducers: {
		save(state, action) {
			return {
				...state,
				result: action.payload
			};
		}
	}
};
