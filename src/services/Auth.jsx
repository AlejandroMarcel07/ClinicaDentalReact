export const isAuthenticated = () => {
    return !!localStorage.getItem("access_token"); // Devuelve true si hay un token
  };