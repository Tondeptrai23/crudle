import { createContext, useContext, useMemo } from "react";
import { checkAuth } from "@/utils/api";

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
  const authed = useMemo(() => {
    return !!sessionStorage.getItem('access-token');
  }, []);

  return {
    authed,
    login: async (username: string, password: string) => {
      try {
        await checkAuth(username, password);
      } catch {
        console.error('Login failed');
        return false;
      }
      return true;
    },
    logout: async () => {
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
