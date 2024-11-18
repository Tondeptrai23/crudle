import { authenticate, invalidateSession, isAuthenticated } from '@/utils/api';
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  authed: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  authed: false,
  login: async () => {},
  logout: async () => {},
});

function useAuth() {
  const [authed, setAuthed] = useState<boolean>(Boolean(isAuthenticated()));

  return {
    authed,
    login: async (username: string, password: string) => {
      await authenticate(username, password);
      setAuthed(true);
    },
    logout: async () => {
      await invalidateSession();
      setAuthed(false);
    },
  };
}

export function useRole() {
  return sessionStorage.getItem('role') ?? '';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function AuthComsumer() {
  return useContext(AuthContext);
}
