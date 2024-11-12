import { createContext, useContext, useState } from "react";
import { authenticate, isAuthenticated } from "@/utils/api";

interface AuthContextType {
  authed: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  authed: false,
  login: async () => false,
  logout: async () => false,
});

function useAuth() {
  const [authed, setAuthed] = useState<boolean>(!!isAuthenticated());

  return {
    authed: authed,
    login: async (username: string, password: string) => {
      try {
        await authenticate(username, password);
        setAuthed(true);
      } catch {
        console.error('Login failed');
        return false;
      }
      return true;
    },
    logout: async () => {
      setAuthed(false);
      return true;
    },
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>
    {children}
  </AuthContext.Provider>;
}

export default function AuthComsumer() {
  return useContext(AuthContext);
} 
