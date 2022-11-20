import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStoreHook } from '@/store/modules/user';
import { isCheckTimeout } from '@/utils/auth';

let userStore = null;
// 基础设置
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    userStore = useUserStoreHook();
    // 在这个位置需要统一的去注入token
    if (userStore.token) {
      // 对token失效时长处理
      if (isCheckTimeout()) {
        userStore.logout();
        return Promise.reject(new Error('token 失效'));
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config; // 必须返回配置
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data;
    } else {
      // 业务错误
      ElMessage.error(message); // 提示错误消息
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    userStore = useUserStoreHook();
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.code === 401) {
      userStore.logout();
    }
    ElMessage.error(error.message); // 提示错误信息
    return Promise.reject(error);
  },
);

export default service;
