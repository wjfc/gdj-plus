// 账户信息
import axios from 'axios';
import { stringify } from 'qs';
import { getLongToken } from '@/utils/longToken';
export async function fakeAccountLogin(params) {
  return axios.post('/tvplus/api/v1/user/login', params);
}
export async function queryCurrent(id) {
  return axios.get('/tvplus/api/v1/user/' + id, { headers: { 'X-Long-Token': getLongToken() } });
}
