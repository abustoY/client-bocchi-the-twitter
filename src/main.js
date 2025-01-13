import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { worker } from './mocks/browser';
import './assets/styles/global.css';

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development' || process.env.VUE_APP_ENABLE_MSW === 'false') {
        return;
    }

    return worker.start();
}

enableMocking().then(()=>{
    createApp(App).use(router).use(createPinia()).mount('#app')
})
