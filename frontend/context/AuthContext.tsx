'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user.types';
import { StorageUtil } from '@/lib/utils/storage.util';
import { AuthEndpoints } from '@/lib/api/endpoints/auth.endpoints';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = StorageUtil.getToken();
      console.log('Token from storage:', token); // DEBUG

      if (!token) {
        console.log('No token found'); // DEBUG
        setIsLoading(false);
        return;
      }

      console.log('Calling getCurrentUser...'); // DEBUG
      const response = await AuthEndpoints.getCurrentUser();
      console.log('User response:', response); // DEBUG
      setUser(response.user);
    } catch (error) {
      console.error('Auth check failed:', error); // DEBUG
      StorageUtil.removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, userData: User) => {
    console.log('Login called with:', { token, userData }); // DEBUG
    StorageUtil.setToken(token);
    setUser(userData);
  };

  const logout = () => {
    StorageUtil.removeToken();
    setUser(null);
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}