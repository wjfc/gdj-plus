// 账户信息
import request from '@/utils/request';
import { stringify } from 'qs';
import { getLongToken } from '@/utils/longToken';
// 登录
export async function fakeAccountLogin(params) {
  return request.post('/tvplus/api/v1/user/login', params);
}
// 根据当前账户id获取详细信息。
export async function queryCurrent(id) {
  return request.get('/tvplus/api/v1/user/' + id);
}

export async function queryUsersPage() {
  return request.post('/tvplus/api/v1/user/page', { pageNum: 1000 });
}
