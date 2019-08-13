// 消息
import request from '@/utils/request';
import { stringify } from 'qs';
export async function getMessageByType(params) {
  return request.get(`/apis/message?${stringify(params)}`);
}
export async function updateMessageById(params) {
  return request.post(`/apis/updateMessageById`, params);
}
export async function deleteMessageById(params) {
  return request.post(`/apis/delMessage`, params);
}
