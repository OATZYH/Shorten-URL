// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/apiConnect';
import axios, { AxiosError } from 'axios';

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

  // Fetch current user on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance
        .get('/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error(err);
          setUser(null);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const res = await axiosInstance.post('/auth/login', { username, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Logged in successfully');
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
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setUser(user);
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
