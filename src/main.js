import { createApp, reactive } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import { Money3Component } from 'v-money3'
import currency from 'currency.js';

import '../public/css/styles.css'
import '../public/css/fonts.css'

import { createStore } from 'vuex';

const store = createStore({
  state: reactive({
    clickHandler: null
  }),
  mutations: {
    setClickHandler(state, handler) {
      state.clickHandler = handler;
    }
  }
});

loadFonts()

const app = createApp(App);

// Agregar una variable global
app.config.globalProperties.$myGlobalVariable = 'Hola, soy una variable global';

app.config.globalProperties.$store = store;


app.use(store)
app.use(router)
  .use(vuetify, Money3Component, currency)
  .mount('#app')
