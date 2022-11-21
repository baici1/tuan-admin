// 处理与用户相关的信息
import { defineStore } from 'pinia';
import { login, getUserInfo } from '@/api/sys.js';
import store from '@/store/index';
import { setItem, getItem, removeAllItem } from '@/utils/storage';
import { TOKEN } from '@/config/index';
import md5 from 'md5';
import router from '@/router';
import { setTimeStamp } from '@/utils/auth';

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      token: getItem(TOKEN) || '',
      userInfo: {
        avatar: 'http://project.yangdiy.cn/tuan.png',
      },
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
            this.setToken(data.token);
            setTimeStamp(); // 保存登录时间
            // 登录后操作
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     *
     * @returns 用户信息
     */
    async getUserInfo() {
      const res = await getUserInfo();
      this.userInfo = res;
      return res;
    },
    /**
     *
     * @returns true 判断用户信息是否为空
     */
    hasUserInfo() {
      return JSON.stringify(this.userInfo) !== '{}';
    },
    /**
     * 用户退出，删除缓存信息
     */
    logout() {
      this.setToken('');
      this.setUserInfo({});
      removeAllItem();
      router.push('/login');
    },
  },
});
export function useUserStoreHook() {
  return useUserStore(store);
}
