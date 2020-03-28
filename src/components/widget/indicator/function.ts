import Vue from 'vue';
import indicator from './indicator.vue';

const LIndicator = Vue.extend(indicator);

export default (options: any) => {

  const instance: any = new LIndicator({
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

  // 单纯的更改显示文本
  instance.vm.setText = function (text: string): void {
    if (!this.visible) {
      this.show();
    }
    this.showText = text;
  };

  instance.vm.hide = () => {
    instance.vm.visible = false;
  };

  // 动画结束 销毁实例和移除dom
  instance.vm.$on('hide', () => {
    document.body.removeChild(instance.vm.$el);
    instance.vm.$destroy();
  });
  return instance.vm;
};
