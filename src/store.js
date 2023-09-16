// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: null, // Initialize the token as null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  getters: {
    isAuthenticated: (state) => {
      // Check if the user is authenticated based on the presence of the token
      return !!state.token;
    },
  },
});

export default store;
