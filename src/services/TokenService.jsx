import axios from 'axios';
import { API_ROUTES } from './Urls';

// Verifica si el token ha expirado
const isTokenExpired = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() >= expirationTime;
  };


// Función para obtener un nuevo access token usando el refresh token
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      const response = await axios.post(API_ROUTES.REFRESH_TOKEN, {
        refresh_token: refreshToken,
      });
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      return access_token;
    } catch (error) {
      console.error("Error al renovar el token:", error);
      throw error;
    }
  };


// Función para obtener el token, primero verifica si el token es válido
export const getAuthToken = async () => {
    let token = localStorage.getItem("access_token");
    
    if (token && isTokenExpired(token)) {
      // Si el token ha expirado, intenta refrescarlo
      token = await refreshAccessToken();
    }
  
    return token;
  };

// Función para obtener el token inicial (en el login)
export const GetToken = async (username, password) => {
    try {
      const response = await axios.post(API_ROUTES.ACCESS_TOKEN, {
        username,
        password,
      });
      
      // Guardar los tokens en el localStorage (o sessionStorage)
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      
      return response.data; // Retorna el token
    } catch (error) {
      console.error("Error al obtener el token:", error);
      throw error; // Lanza el error para que lo maneje el formulario
    }
  };