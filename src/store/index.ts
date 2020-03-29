import Vue from 'vue'
import Vuex from 'vuex'
import { AuthServiceFactory } from '@/auth/AuthServiceFactory'
import { ProviderType } from '@/auth/ProviderType'
import { StorageServiceFactory } from '@/storage/StorageServiceFactory'
import { StorageType } from '@/storage/StorageType'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authService: AuthServiceFactory.getAuthService(ProviderType.Firebase),
    storageService: StorageServiceFactory.getStorageService(StorageType.Firebase)
  },
  getters: {
    authService: state => state.authService,
    storageService: state => state.storageService
  },
  mutations: {
    setAuthService: (state, authService) => (state.authService = authService),
    setStorageService: (state, storageService) => (state.storageService = storageService)
  },
  actions: {
    createAuthService({ commit }, type) {
      const authService = AuthServiceFactory.getAuthService(type);
      commit('setAuthService', authService);
    },

    createStorageService({ commit }, type) {
        const storageService = StorageServiceFactory.getStorageService(type)
        commit('setStorageService', storageService);
    }
  },
  modules: {
  }
})
