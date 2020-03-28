// @ts-ignore
import {Commit} from 'vuex';
// 全部actions
export default {
  // 设置用户信息
  setUserInfo (context: { commit: Commit }, userInfo: any) {
    context.commit('setUserInfo', userInfo);
  }
};
