'use client';
import { createContext, useContext } from 'react';

export interface AuthContextType {
  userId: string | null;
  setUserId: (userId: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;