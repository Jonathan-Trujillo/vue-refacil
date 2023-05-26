import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import { Money3Component } from 'v-money3'
import currency from 'currency.js';

import '../public/css/styles.css'
import '../public/css/fonts.css'

loadFonts()

const app = createApp(App);

// Agregar una variable global
app.config.globalProperties.$myGlobalVariable = 'Hola, soy una variable global';

// app.config.globalProperties.$cerrar_caja = () => {
//   // alert('Si llego aqui')
//   app.config.globalProperties.$valor_cerrar_caja = true
// }

app.config.globalProperties.$valor_cerrar_caja = {
  state: false,
  toggle() {
    this.state = !this.state;
  }
};

app.use(router)
  .use(vuetify, Money3Component, currency)
  .mount('#app')
