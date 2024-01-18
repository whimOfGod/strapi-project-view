import { createApp } from 'vue';
import App from './App.vue';
import apiService from './services/api.service';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

// Service Axios comme variable globale
app.config.globalProperties.$api = apiService;

// Nouvelle fonction pour réaliser des appels multiples

app.mount('#app');
