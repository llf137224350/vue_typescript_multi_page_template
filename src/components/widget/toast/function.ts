import Vue from 'vue';
import toast from './toast.vue';
const Toast = Vue.extend(toast);
export default (options: any) => {
  const instance: any = new Toast({
    propsData: options
  });
  // 创建虚拟dom
  instance.vm = instance.$mount();
  // 挂在到dom
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  // 动画结束 销毁实例和移除dom
  instance.vm.$on('hide', () => {
    document.body.removeChild(instance.vm.$el);
    instance.vm.$destroy();
  });
  return instance.vm;
};
