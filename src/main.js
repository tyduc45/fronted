import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/github.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
