import axios from 'axios';

const apiClient = axios.create({
// l'URL réelle de mon API Strapi
  baseURL: 'http://localhost:1337', 
  headers: {
    'Content-Type': 'application/json',
    //en-têtes
  },
});

export default apiClient;
