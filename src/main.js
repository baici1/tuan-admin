import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 导入全局样式
import './styles/index.scss';
// 自定义icon
import installIcons from '@/assets/icons/index.js';
import 'virtual:svg-icons-register'; // 引入注册脚本
import './permission'; // 导入路由守卫
const app = createApp(App);
installIcons(app);
app.use(store).use(router).mount('#app');
