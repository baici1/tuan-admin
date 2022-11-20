import router from './router';
import { useUserStoreHook } from '@/store/modules/user';
const userStore = useUserStoreHook();
// 白名单
const whiteList = ['/login'];
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token ，进入主页
  // if (store.state.user.token) {
  // 快捷访问
  if (useUserStoreHook().token) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!userStore.hasUserInfo) {
        // 触发获取用户信息的 action
        await userStore.getUserInfo();
      }
      next();
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
    }
  }
});
