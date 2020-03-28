import Vue from 'vue';
import ActionSheet from './action_sheet.vue';

const ASheet = Vue.extend(ActionSheet);

export default (options: any) => {
  const instance: any = new ASheet({
    propsData: options
  });
  // 创建虚拟dom
  instance.vm = instance.$mount();
  // 添加方法
  instance.vm.show = () => {
    // 挂在到dom
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
  };
  instance.vm.hide = () => {
    instance.vm.visible = false;
  };
  // 动画结束 销毁实例和移除dom
  instance.vm.$on('hide', () => {
    document.body.removeChild(instance.vm.$el);
    instance.vm.$destroy();
  });
  instance.vm.$on('onCancelHandle', () => {
      instance.vm.visible = false;
  });
  return instance.vm;
};
