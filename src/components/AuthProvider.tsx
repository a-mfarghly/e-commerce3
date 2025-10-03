"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signin, signup, forgotPassword, verifyResetCode, User } from '@/services/clientApi';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  verifyResetCode: (resetCode: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  checkTokenValidity: () => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const currentUser = JSON.parse(userData);
        setUser(currentUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    
    setLoading(false);
  }, []);

  const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const result = !!(token && userData && user);
    return result;
  };

  const getIsAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    return !!(token && userData && user);
  };

  const checkTokenValidity = () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    return !!(token && userData);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await signin({ email, password });
      
      let user, token;
      
      if (response && response.data) {
        user = response.data.user;
        token = response.data.token;
      } else if (response && response.user) {
        user = response.user;
        token = response.token;
      } else if (response && response.data && response.data.data) {
        user = response.data.data.user;
        token = response.data.data.token;
      } else {
        console.error('AuthProvider: Unexpected response structure:', response);
        throw new Error('Invalid response structure from server');
      }
      
      if (user && token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        console.error('AuthProvider: Missing user or token in response');
        throw new Error('Invalid response from server - missing user or token');
      }
    } catch (error) {
      console.error('AuthProvider: Login error:', error);
      throw error;
    }
  };

  const register = async (userData: { name: string; email: string; password: string; phone?: string }) => {
    try {
      const response = await signup({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        rePassword: userData.password,
        phone: userData.phone || ''
      });
      
      let user, token;
      
      if (response && response.data) {
        user = response.data.user;
        token = response.data.token;
      } else if (response && response.user) {
        user = response.user;
        token = response.token;
      } else if (response && response.data && response.data.data) {
        user = response.data.data.user;
        token = response.data.data.token;
      } else {
        console.error('AuthProvider: Unexpected response structure:', response);
        throw new Error('Invalid response structure from server');
      }
      
      if (user && token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        console.error('AuthProvider: Missing user or token in response');
        throw new Error('Invalid response from server - missing user or token');
      }
    } catch (error) {
      console.error('AuthProvider: Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleForgotPassword = async (email: string) => {
    try {
      await forgotPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const handleVerifyResetCode = async (resetCode: string) => {
    try {
      await verifyResetCode(resetCode);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      throw new Error('Reset password API not implemented yet');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: getIsAuthenticated(),
      login,
      register,
      logout,
      forgotPassword: handleForgotPassword,
      verifyResetCode: handleVerifyResetCode,
      resetPassword,
      checkTokenValidity,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
