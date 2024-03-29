import axios from 'axios';
import { getLongToken, setLongToken } from '@/utils/longToken';
import { notification } from 'antd';
import router from 'umi/router';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};



const request = axios.create({ headers: { 'X-Long-Token': getLongToken() }, });
// 请求拦截
request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
// 响应拦截
request.interceptors.response.use(
  response => {
    const { headers } = response;
    const longtoken = headers['x-long-token'];
    if (longtoken) {
      setLongToken(response);
    }
    // 针对广电+后台接口，返回成功但是errorcode不是0的情况下统一做拦截
    const { data = {} } = response;
    if (data.errorCode) {
      if (data.errorCode === 100000) {
        notification.error({
          message: data.errorMessage,
        });
        router.push('/user/login');
        return;
      }
    }
    return data;
  },
  error => {
    let errorObj = JSON.parse(JSON.stringify(error));
    const { response = {} } = error;
    const { status, statusText } = response;
    const errortext = codeMessage[response.status] || response.statusText;

    if (status === 401) {
      notification.error({
        message: '未登录或登录已过期，请重新登录。',
      });
      router.push('/user/login');
      return;
    }
    if (status) {
      notification.error({
        message: `请求错误 ${status}`,
        description: errortext,
      });
    }
    if (status === 403) {
      // router.push('/exception/403');
      return;
    }
    if (status <= 504 && status >= 500) {
      // router.push('/exception/500');
      return;
    }
    if (status >= 404 && status < 422) {
      // router.push('/exception/404');
    }
    return errorObj;
  },
);

export default request;
