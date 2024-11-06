import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminProtectedRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.is_admin) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
