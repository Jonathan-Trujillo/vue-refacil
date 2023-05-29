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

app.use(router)
  .use(vuetify, Money3Component, currency)
  .mount('#app')
