import indicator from './indicator.vue';
import indicatorFC from './function';

export default (Vue: any) => {
  Vue.component(indicator.name, indicator);
  Vue.prototype.$indicator = indicatorFC;
};
