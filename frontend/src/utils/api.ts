import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5262',
});

const publicApi = axios.create({
  baseURL: 'http://localhost:5262',
});

export const isExpired = (token: string) => {
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const expirationDate = new Date(decodedToken.exp * 1000);
  return new Date() > expirationDate;
};

export const authenticate = async (username: string, password: string) => {
  const response = await publicApi.post('/api/Auth/login', {
    Username: username,
    Password: password,
  });

  sessionStorage.setItem('access-token', response.data.Data.AccessToken);
  sessionStorage.setItem('user-id', response.data.Data.UserId);
  sessionStorage.setItem('refresh-token', response.data.Data.RefreshToken);
};

export const isAuthenticated = () => {
  const token = sessionStorage.getItem('access-token');

  if (!token || isExpired(token)) {
    const refreshToken = sessionStorage.getItem('refresh-token');
    const userId = sessionStorage.getItem('user-id');
    if (!refreshToken) {
      return false;
    }
    publicApi
      .post('/api/Auth/refresh', {
        UserId: userId,
        RefreshToken: refreshToken,
      })
      .then((response) => {
        sessionStorage.setItem('access-token', response.data.Data.AccessToken);
        return true;
      })
      .catch(() => {
        console.error('Failed to refresh token');
        return false;
      });
  }
  else {
    return true;
  }
};

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
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
      originalRequest._retry = true;
      try {
        const response = await publicApi.post('/api/Auth/refresh', {
          UserId: sessionStorage.getItem('user-id'),
          RefreshToken: sessionStorage.getItem('refresh-token'),
        });

        console.log('refreshed token');

        const newAccessToken = response.data.Data.AccessToken;
        sessionStorage.setItem('access-token', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token 2');

        return Promise.reject(refreshError);
      }
    }
  },
);

export default api;
