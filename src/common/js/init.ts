import 'common/css/reset.css'; // 设置元素默认样式
import Vue from 'vue';
Vue.config.productionTip = false;
  /**
   *  计算html字体大小
   */
(() => {
    const setRootFontSize = () => {
      // 进行rem适配 设置根元素字体大小
      const width = document.documentElement.clientWidth || document.body.clientWidth;
      const htmlDom = document.getElementsByTagName('html')[0];
      htmlDom.style.fontSize = width / 10 + 'px';
    };
    // 设置适配
    setRootFontSize();
    // 屏幕大小改变后，重新进行设置根字体大小
    window.onresize = () => {
      setRootFontSize();
    };
})();
