import {
  authenticate,
  getRole,
  invalidateSession,
  isAuthenticated,
} from '@/utils/api';
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  authed: boolean;
  role: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  authed: false,
  role: '',
  login: async () => {},
  logout: async () => {},
});

function useAuth() {
  const [authed, setAuthed] = useState<boolean>(Boolean(isAuthenticated()));
  const [role, setRole] = useState<string>(getRole());

  return {
    authed,
    role,
    login: async (username: string, password: string) => {
      await authenticate(username, password);
      setAuthed(true);
      setRole(getRole());
    },
    logout: async () => {
      await invalidateSession();
      setAuthed(false);
      setRole('');
    },
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(AuthContext);
}
