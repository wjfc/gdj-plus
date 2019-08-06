// 账户信息
import axios from 'axios';
import { stringify } from 'qs';
export async function fakeAccountLogin(params) {
	return axios.post('/tvplus/api/v1/user/login', params);
}
