// import VueRouter from 'vue-router';
declare const VueRouter: any;
// 首页顶级路由
const routes = [
  {
    path: '/demo',
    name: 'demo',
    component: (resolve: any) => require.ensure([], () => resolve(require('../components/demo/demo.vue')), 'demo'),
    meta: {
      title: 'demo'
    }
  },
  {
    path: '/demo01',
    name: 'demo01',
    component: (resolve: any) => require.ensure([], () => resolve(require('../components/demo01/demo01.vue')), 'demo'),
    meta: {
      title: 'demo01'
    }
  },
];

export default new VueRouter({routes});
