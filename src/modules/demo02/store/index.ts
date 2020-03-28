import Vue from 'vue';
import Vuex from 'vuex';
import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';
Vue.use(Vuex);
const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development', // 严格模式
  state: defaultState,
  mutations,
  getters,
  actions
});
// store 热更新
if (module.hot) {
  module.hot.accept([
    './state/state',
    './mutations/mutations',
    './actions/actions',
    './getters/getters'
  ], () => {
    const newState = require('./state/state').default;
    const newMutations = require('./mutations/mutations').default;
    const newActions = require('./actions/actions').default;
    const newGetters = require('./getters/getters').default;

    // @ts-ignore
    store.hotUpdate({state: newState,
      mutations: newMutations,
      getters: newGetters,
      actions: newActions
    });
  });
}

export default store;
