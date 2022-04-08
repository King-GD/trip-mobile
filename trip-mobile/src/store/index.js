import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
    },
    profile: {
    }
  },
  mutations: {
    /**
     *设置用户信息
     */
    [types.UPDATE_USER_INFO] (state, { user, profile}) {
      state.user = {
        ...state.user,
        ...user
      }
      state.profile = {
        ...state.profile,
        ...profile
      }
    },
    /**
     * 删除用户的信息
     */
    [types.DELETE_USER_INFO] (state) {
      state.user = {}
      state.profile = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
