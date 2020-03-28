/**
 * 当前文件配置打包时cdn引入依赖
 *   工具自动完成
 */

const keys = {
  vue: 'vue',
  vueRouter: 'vueRouter',
  vuex: 'vuex',
  axios: 'axios',
  animate: 'animate',
  crypto: 'crypto',
  swiperCss: 'swiperCss',
  swiperJS: 'swiperJS',
  jweixin: 'jweixin',
  clipboard: 'clipboard',
  konva: 'konva',
  sohu: 'sohu',
  amap: 'amap'
};

const _base = function (isProd = true) {
  const min = isProd ? '.min' : '';
  const obj = {};
  // @ts-ignore
  obj[keys.vue] = `<script src="https://lib.baomitu.com/vue/2.6.10/vue${min}.js"></script>`;// vuex
  // @ts-ignore
  obj[keys.vueRouter] = `<script src="https://lib.baomitu.com/vue-router/3.1.3/vue-router${min}.js"></script>`;// vuex
  // @ts-ignore
  obj[keys.vuex] = `<script src="https://lib.baomitu.com/vuex/3.1.1/vuex${min}.js"></script>`;// vuex
  // @ts-ignore
  obj[keys.axios] = `<script src="https://lib.baomitu.com/axios/0.19.0/axios${min}.js"></script>`; // 网络请求
  // @ts-ignore
  obj[keys.animate] = `<link href="https://lib.baomitu.com/animate.css/3.5.2/animate${min}.css" rel="stylesheet">`;
  // @ts-ignore
  obj[keys.crypto] = `<script src="https://lib.baomitu.com/crypto-js/3.1.9/crypto-js${min}.js"></script>`; // crypto-js
  // @ts-ignore
  obj[keys.swiperCss] = `<link rel="stylesheet" href="https://lib.baomitu.com/Swiper/3.4.2/css/swiper${min}.css">`; // swiper 轮播图样式
  // @ts-ignore
  obj[keys.swiperJS] = `<script src="https://lib.baomitu.com/Swiper/3.4.2/js/swiper${min}.js"></script>`; //  swiperjs
  // @ts-ignore
  obj[keys.jweixin] = '<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>'; // 微信js-sdk
  // @ts-ignore
  obj[keys.clipboard] = `<script src="https://lib.baomitu.com/clipboard.js/2.0.4/clipboard${min}.js"></script>`; // 复制插件
  // @ts-ignore
  obj[keys.konva] = `<script src="https://lib.baomitu.com/konva/3.2.4/konva${min}.js"></script>`; // conva绘制
  // @ts-ignore
  obj[keys.sohu] = '<script src="https://pv.sohu.com/cityjson?ie=utf-8"></script>'; // 搜狐获取ip
  // @ts-ignore
  obj[keys.amap] = '<script src="https://webapi.amap.com/maps?v=1.4.15&key=89298f0c40792b4fe7b70812ef251567"></script>'; // 高德地图
  return obj;
};

/**
 *  封装返回结果
 * @param isProd
 * @param arr
 * @returns {string}
 */
// @ts-ignore
function getResult (isProd, arr) {
  const selfBase = _base(isProd);
  let result = '';
  // @ts-ignore
  arr.forEach((item) => {
    // @ts-ignore
    result += selfBase[item];
  });
  return result;
}


/**
 * @description
 * @return {string}
 */
// @ts-ignore
function demo01 (isProd) {
  return getResult(isProd, [keys.animate, keys.vue, keys.vueRouter, keys.vuex, keys.axios, keys.crypto, keys.amap, keys.sohu]);
}
function demo02 (isProd) {
  return getResult(isProd, [keys.animate, keys.vue, keys.vueRouter, keys.vuex, keys.axios, keys.crypto, keys.amap, keys.sohu]);
}
// 导出名字需要与单页名称一致
module.exports = {
  demo01,
  demo02
};
