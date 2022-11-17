import request from '@/utils/request.js';

/**
 * 登录
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  });
};
