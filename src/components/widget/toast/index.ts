import toastComponent from './toast.vue';
import toast from './function';
export default (Vue: any) => {
  Vue.component(toastComponent.name, toastComponent);
  Vue.prototype.$toast = toast;
};
