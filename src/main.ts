import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';


import App from './App.vue'
import router from './router'
library.add(faRotateRight);


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app')
