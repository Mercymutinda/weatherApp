import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { chart } from 'chart.js'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


import App from './App.vue'
import router from './router'
// import  Chart  from 'chart.js'


const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(Chart)


app.mount('#app')
