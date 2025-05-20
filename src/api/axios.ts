import axios from 'axios';
import { refreshToken } from './refreshToken';
import { useAuthStore } from '../store/AuthStore';
// import Config from 'react-native-config';
 
const api = axios.create({
  baseURL: 'https://backend-practice.eurisko.me',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}); 

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = useAuthStore.getState().refreshToken;
        if (!refreshTokenValue) {
          throw new Error('No refresh token available');
        }

        const { accessToken, refreshToken: newRefreshToken } = await refreshToken(refreshTokenValue);
        
        // Update tokens in store
        useAuthStore.getState().setTokens(accessToken, newRefreshToken);

        // Update the failed request's authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, clear tokens and redirect to login
        useAuthStore.getState().clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 