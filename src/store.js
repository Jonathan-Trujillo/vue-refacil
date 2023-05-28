import { createStore } from 'vuex';

const store = createStore({
  state: {
    valorComponente1: ''
  },
  mutations: {
    actualizarValorComponente1(state, nuevoValor) {
      state.valorComponente1 = nuevoValor;
    }
  },
  actions: {
    actualizarValorComponente1({ commit }, nuevoValor) {
      commit('actualizarValorComponente1', nuevoValor);
    }
  },
  getters: {
    obtenerValorComponente1: state => state.valorComponente1
  }
});

export default store;
