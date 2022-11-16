import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';
// 导入全局样式
import './styles/index.scss';
const app = createApp(App);
app.use(store).use(router).mount('#app');
