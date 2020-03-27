import Vue from 'vue'
import Vuex from 'vuex'
import { AuthServiceFactory } from '@/auth/AuthServiceFactory'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authService: null,
    currentUser: null
  },
  getters: {
    authService: state => state.authService,
  },
  mutations: {
    setAuthService: (state, authService) => (state.authService = authService)
  },
  actions: {
    createAuthService({ commit }, type) {
      const authService = AuthServiceFactory.getAuthService(type);
      commit('setAuthService', authService);
    }
  },
  modules: {
  }
})
