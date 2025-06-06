import React from 'react'
import { Navigate } from "react-router-dom";
import { isAuthenticated } from './Auth';

export function AuthRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
      }
      return children;
}
