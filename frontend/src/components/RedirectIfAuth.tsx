// src/components/RedirectIfAuth.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RedirectIfAuth: React.FC = () => {
  const { user } = useAuth();

  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default RedirectIfAuth;
