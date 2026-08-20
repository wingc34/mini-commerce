'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { removeToken, isAuthenticated } from '@/lib/auth';
import { api } from '@/lib/api-client';
import { ApiResponse } from '@/types/api';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  signOut: () => void;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<
    'loading' | 'authenticated' | 'unauthenticated'
  >('loading');

  async function fetchUser() {
    if (!isAuthenticated()) {
      setStatus('unauthenticated');
      return;
    }

    try {
      const res = await api.get<ApiResponse<User>>('/api/v1/users/me');
      setUser(res.data);
      setStatus('authenticated');
    } catch {
      removeToken();
      setStatus('unauthenticated');
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function signOut() {
    removeToken();
    setUser(null);
    setStatus('unauthenticated');
    window.location.href = '/';
  }

  return (
    <AuthContext.Provider value={{ user, status, signOut, refetch: fetchUser }}>
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
