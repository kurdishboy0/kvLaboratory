'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole, AuthContextType } from '@/types';
import {
  initStorage,
  getUserByEmail,
  createUser,
  getCurrentUser,
  setCurrentUser,
  updateUser,
} from '@/lib/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initStorage();
    const saved = getCurrentUser();
    if (saved) setUser(saved);
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string; role?: string } => {
    const found = getUserByEmail(email);
    if (!found) return { success: false, error: 'userNotFound' };
    if (found.password !== password) return { success: false, error: 'wrongPassword' };
    
    setUser(found);
    setCurrentUser(found);
    return { success: true, role: found.role };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentUser(null);
  }, []);

  const register = useCallback(
    (name: string, email: string, password: string, role: UserRole): { success: boolean; error?: string; role?: string } => {
      const existing = getUserByEmail(email);
      if (existing) return { success: false, error: 'emailExists' };
      if (password.length < 4) return { success: false, error: 'passwordTooShort' };
      
      const newUser = createUser(name, email, password, role);
      setUser(newUser);
      setCurrentUser(newUser);
      return { success: true, role: newUser.role };
    },
    []
  );

  const updateProfile = useCallback((data: Partial<User>) => {
    if (!user) return;
    const updated = updateUser(user.id, data);
    if (updated) setUser(updated);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

