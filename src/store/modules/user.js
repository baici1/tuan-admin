// 处理与用户相关的信息
import { defineStore } from 'pinia';
import { login } from '@/api/sys.js';
import store from '@/store/index';
import { setItem, getItem } from '@/utils/storage';
import { TOKEN } from '@/config/index';
import md5 from 'md5';

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      token: getItem(TOKEN) || '',
    };
  },
  getters: {},
  actions: {
    /**
     * 设置token
     * @param {string} token
     */
    setToken(token) {
      console.log('%c Line:23 🍰 token', 'color:#fca650', token);

      this.token = token;
      console.log('%c Line:26 🍓 this.token', 'color:#3f7cff', this.token);
      setItem(TOKEN, token);
    },
    /**
     * 登录
     * @param {object} userInfo
     * @returns
     */
    Login(userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password),
        })
          .then((data) => {
            console.log('%c Line:40 🍫 data', 'color:#ed9ec7', data.token);
            this.setToken(data.token);
            // 登录后操作
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
export function useUserStoreHook() {
  return useUserStore(store);
}
