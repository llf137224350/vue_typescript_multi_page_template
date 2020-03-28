// import VueRouter from 'vue-router';
declare const VueRouter: any;
// 首页顶级路由
const routes = [
  {
    path: '/demo02',
    name: 'demo02',
    component: (resolve: any) => require.ensure([], () => resolve(require('../components/demo02/demo02.vue')), 'demo'),
    meta: {
      title: 'demo02'
    }
  }
];
export default new VueRouter({routes});
