import Vue from 'vue';
import {setTitle} from '@/common/js/util';
import toast from '../../components/widget/toast';
import indicator from '../../components/widget/indicator';
import actionSheet from '../../components/widget/action_sheet';
import App from './demo02.vue';
import router from './router/index';
import store from './store';

require('common/js/init.ts');
Vue.use(toast);
Vue.use(indicator);
Vue.use(actionSheet);
declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
  interface Vue {
    $indicator: any, // 加载中或者提交中动画
    $toast: any, // 带图标或者不带图标提示
    $actionSheet: any, // 弹出多操作项
  }
}

// 拦截路由 设置标题;
router.beforeEach((to: any, from: any, next: any) => {
  setTitle(to.meta.title);
  next();
});
// @ts-ignore
new Vue({router: router,
  store,
  render: (h: any) => h(App)
}).$mount('#app');
