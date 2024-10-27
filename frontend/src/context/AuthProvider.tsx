import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  api?: AxiosInstance;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
  });

  const login = useCallback((accessToken: string, refreshToken: string) => {
    setAuthState(prev => ({
      ...prev,
      accessToken,
      refreshToken,
    }));
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      accessToken: null,
      refreshToken: null,
    });
  }, []);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:4000',
    });

    const requestInterceptor = api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (authState.accessToken) {
          config.headers.Authorization = `Bearer ${authState.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 && 
          !originalRequest._retry && 
          authState.refreshToken
        ) {
          try {
            originalRequest._retry = true;
            const response = await axios.post('http://localhost:4000/token', {
              token: authState.refreshToken,
            });
            
            const newAccessToken = response.data.accessToken;
            setAuthState(prev => ({
              ...prev,
              accessToken: newAccessToken,
            }));
            
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    setAuthState(prev => ({ ...prev, api }));

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [authState.accessToken, authState.refreshToken, logout]);

  const value = {
    authState,
    setAuthState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;