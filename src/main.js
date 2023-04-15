import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

import '../public/css/styles.css'
import '../public/css/fonts.css'

loadFonts()

createApp(App).use(router)
  .use(vuetify)
  .mount('#app')
