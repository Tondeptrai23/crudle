import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5262',
});

export const checkAuth = async (username: string, password: string) => {
  console.log('checkAuth', username, password);
  const response = await api.post('/api/Auth/login', {
    Username: username,
    Password: password,
  });

  sessionStorage.setItem('access-token', response.data.Data.AccessToken);
  sessionStorage.setItem('refresh-token', response.data.Data.RefreshToken);
}

export const isAuthenticated = () => {
  return !!sessionStorage.getItem('access-token');
}

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      sessionStorage.getItem('refresh-token')
    ) {
      try {
        originalRequest._retry = true;
        const response = await api.post('/api/Auth/refresh', {
          RefreshToken: sessionStorage.getItem('refresh-token'),
        });

        const newAccessToken = response.data.Data.AccessToken;
        sessionStorage.setItem('access-token', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  }
);

export default api;