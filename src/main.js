import { createApp } from 'vue';
import App from './App.vue';
import apiService from './services/api.service';

const app = createApp(App);

// Service Axios comme variable globale
app.config.globalProperties.$api = apiService;

app.mount('#app');
