import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from './pinia'
import router from './routes/index'

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
