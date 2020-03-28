import ActionSheet from './action_sheet.vue';
import AS from './function';

export default (Vue: any) => {
  Vue.component(ActionSheet.name, ActionSheet);
  Vue.prototype.$actionSheet = AS;
};
