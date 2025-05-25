import axios from 'axios';
import { getAuthToken } from './TokenService';

const axiosInstance = axios.create();

// Agregar token en los headers de cada solicitud
axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getAuthToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosInstance;