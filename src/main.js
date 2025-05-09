
import { createApp } from 'vue'
import App from './App.vue'        // Remove './src/' part
import router from './router'      // Remove './src/' part
import './index.css'               // Remove './src/' part

createApp(App).use(router).mount('#app')


const app = createApp(App)
app.use(router)
app.mount('#app')
