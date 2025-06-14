import React from 'react'
import { Navigate } from "react-router-dom";
import { isAuthenticated } from './Auth';


// Validar si este usuario esta autenticado cuando ingrese a una url de inquilino si no lo estado lo dirige al home
export function AuthRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
      }
      return children;
}
