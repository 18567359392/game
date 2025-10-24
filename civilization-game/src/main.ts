import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
