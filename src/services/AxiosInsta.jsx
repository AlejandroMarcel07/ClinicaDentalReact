import axios from 'axios';
import { getAuthToken } from './TokenService';

const axiosInstance = axios.create();

// usamos axios para agregar el token en cada header de solicitud
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