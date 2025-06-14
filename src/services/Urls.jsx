export const BASE_URL = "http://localhost:8000";
export const CLIENTS_BASE = `${BASE_URL}/clients`;

const getDynamicDomain = () => {
  const domain = localStorage.getItem("domain");
  if (!domain) {
    throw new Error("Domain no definido. Asegúrate de haber iniciado sesión.");
  }
  return domain;
};

export const API_ROUTES = {
  // Rutas publicas para ususario externos
  ADMIN: `${BASE_URL}/admin/`,
  SWAGGER: `${BASE_URL}/swagger/`,
  REDOC: `${BASE_URL}/redoc/`,
  REFRESH_TOKEN: `${BASE_URL}/api/token/refresh/`,
  ACCESS_TOKEN: `${BASE_URL}/api/token/`,
  GET_DOMAIN: `${BASE_URL}/get/domain/`,

  // Rutas para clientes que usan solicitudes
  API_PACIENTE: () => `${CLIENTS_BASE}/${getDynamicDomain()}/movimientos/paciente/`,


  GET_EXPLORACION: () => `${CLIENTS_BASE}/${getDynamicDomain()}/catalogos/exploracion/`,
  EXPLORACION_BY_ID: (id) => `${CLIENTS_BASE}/${getDynamicDomain()}/catalogos/exploracion/id/${id}/`,

  GET_TRATAMIENTO: () => `${CLIENTS_BASE}/${getDynamicDomain()}/catalogos/tratamiento/`,
  TRATAMIENTO_BY_ID: (id) => `${CLIENTS_BASE}/${getDynamicDomain()}/catalogos/tratamiento/id/${id}/`,

  GET_MONTODESCUENTO: () => `${CLIENTS_BASE}/${getDynamicDomain()}/catalogos/montoDescuento/`,
  MONTODESCUENTO_BY_ID: (id) => `${CLIENTS_BASE}/${getDynamicDomain()}/catalogos/montoDescuento/id/${id}/`,

  GET_GENERO: () => `${CLIENTS_BASE}/${getDynamicDomain()}/catalogos/genero/`,
  GENERO_BY_ID: () => `${CLIENTS_BASE}/${getDynamicDomain()}/catalgos/genero/${id}/`,



  GET_PACIENTE: () => `${CLIENTS_BASE}/${getDynamicDomain()}/movimientos/paciente/`,
  PACIENTE_BY_ID: (id) => `${CLIENTS_BASE}/${getDynamicDomain()}/movimientos/paciente/id/${id}/`,

  GET_PACIENTECONSULTA: () => `${CLIENTS_BASE}/${getDynamicDomain()}/movimientos/paciente/consulta/`,
  PACIENTECONSULTA_BY_ID: (id) => `${CLIENTS_BASE}/${getDynamicDomain()}/movimientos/paciente/consulta/id/${id}/`,
}



