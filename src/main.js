import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from './pinia'
import Notifications from '@kyvg/vue3-notification'
import router from './routes/index'

createApp(App)
    .use(router)
    .use(pinia)
    .use(Notifications)
    .mount('#app')
