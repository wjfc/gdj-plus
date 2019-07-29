import axios from 'axios';
import { stringify } from 'qs';
export async function getMessageByType(params) {
	return axios.get(`/apis/message?${stringify(params)}`);
}
export async function updateMessageById(params) {
	return axios.post(`/apis/updateMessageById`, params);
}
export async function deleteMessageById(params) {
	return axios.post(`/apis/delMessage`, params);
}
