import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; // Предполагается, что контекст AuthContext предоставляет состояние авторизации

function ProtectedRoute({ element, redirectTo = "/auth" }) {
  const { isAuthenticated } = useAuth(); // Проверка, авторизован ли пользователь

  return isAuthenticated ? element : <Navigate to={redirectTo} replace />;
}

export default ProtectedRoute;
