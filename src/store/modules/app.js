import NProgress from 'nprogress'
  const state = {
    loading: false,
    exitZhengshu: true,
  }
  const mutations = {
    SET_LOADING: (state, loading) => {
      state.loading = loading
    },
    SET_EXITZHENGSHU: (state, exitZhengshu) => {
      state.exitZhengshu = exitZhengshu
    },
  }
  const actions = {
    openLoading(context){
      NProgress.start();
      context.commit("SET_LOADING", true);
    },
    closeLoading(context){
      NProgress.done();
      context.commit("SET_LOADING", false);
    },
    changeZS(context, d){
      context.commit("SET_EXITZHENGSHU", d);
    },
  }
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
