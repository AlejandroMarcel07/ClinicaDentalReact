import axios from 'axios';
import { API_ROUTES } from './Urls';

const isTokenExpired = (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = decodedToken.exp * 1000;
  return Date.now() >= expirationTime;
};


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

export const getAuthToken = async () => {
  let token = localStorage.getItem("access_token");

  if (token && isTokenExpired(token)) {
    token = await refreshAccessToken();
  }

  return token;
};

export const GetToken = async (username, password) => {
  try {
    const response = await axios.post(API_ROUTES.ACCESS_TOKEN, {
      username,
      password,
    });

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    return response.data;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    throw error;
  }
};