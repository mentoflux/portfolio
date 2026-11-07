import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

const ADMIN_PASSCODE = '143020407';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithPassword: (passcode: string) => boolean;
  logout: () => void;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('hs_admin_auth') === 'true';
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const loginWithPassword = (passcode: string): boolean => {
    setAuthError(null);
    if (passcode.trim() === ADMIN_PASSCODE) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hs_admin_auth', 'true');
      }
      setIsAdmin(true);
      return true;
    } else {
      setAuthError('Incorrect passcode. Please try again.');
      return false;
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('hs_admin_auth');
    }
    setIsAdmin(false);
    setAuthError(null);
  };

  const clearAuthError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        user: null,
        isAdmin,
        loading,
        loginWithPassword,
        logout,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
