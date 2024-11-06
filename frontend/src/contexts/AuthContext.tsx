// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/apiConnect';
import axios, { AxiosError } from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch current user on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode token to get user info
        const decoded = jwtDecode<User & { exp: number }>(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser({
            user_id: decoded.user_id,
            username: decoded.username,
            is_admin: decoded.is_admin,
          });
        }
      } catch (err) {
        console.error('Token decoding error:', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const res = await axiosInstance.post('/auth/login', { username, password });
      const { token } = res.data;
      localStorage.setItem('token', token);

      const decoded = jwtDecode<User & { exp: number }>(token);
      setUser({
        user_id: decoded.user_id,
        username: decoded.username,
        is_admin: decoded.is_admin,
      });
      
      toast.success('Logged in successfully');
      if (decoded.is_admin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || 'Login failed');
      } else {
        toast.error('Login failed');
      }
      throw error;
    }
  };

  // Register function
  const register = async (username: string, password: string) => {
    try {
      const res = await axiosInstance.post('/auth/register', { username, password });
      const { token } = res.data;
      localStorage.setItem('token', token);

      const decoded = jwtDecode<User & { exp: number }>(token);
      setUser({
        user_id: decoded.user_id,
        username: decoded.username,
        is_admin: decoded.is_admin,
      });

      toast.success('Registered successfully');

      if (decoded.is_admin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      toast.success('Registered successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || 'Registration failed');
      } else {
        toast.error('Registration failed');
      }
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    ) 
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
