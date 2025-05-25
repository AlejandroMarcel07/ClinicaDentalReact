export const BASE_URL = "http://localhost:8000";
export const CLIENTS_BASE = `${BASE_URL}/clients`;

// Función para gestionar el dominio dinámico
const getDynamicDomain = () => {
    const domain = localStorage.getItem("domain"); // Obtiene el domain de localStorage
    if (!domain) {
      throw new Error("Domain no definido. Asegúrate de haber iniciado sesión.");
    }
    return domain;
  };

// Rutas de la API
export const API_ROUTES = {
    // Rutas públicas
    ADMIN: `${BASE_URL}/admin/`,
    SWAGGER: `${BASE_URL}/swagger/`,
    REDOC: `${BASE_URL}/redoc/`,
    REFRESH_TOKEN: `${BASE_URL}/api/token/refresh/`,
    ACCESS_TOKEN: `${BASE_URL}/api/token/`,
    GET_DOMAIN: `${BASE_URL}/get/domain/`,
  
    // Rutas para clientes (dependen del domain)
    API_PACIENTE: () => `${CLIENTS_BASE}/${getDynamicDomain()}/movimientos/paciente/`,
  };