import axios from 'axios';
import { store } from '@/redux/store';
import { logout, setCredentials } from '@/redux/slices/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Needed for refreshToken cookie
});

// Auto-refresh access token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          '/auth/refresh',
          {},
          { baseURL: import.meta.env.VITE_API_URL, withCredentials: true }
        );

        const { accessToken } = res.data.data;
        store.dispatch(setCredentials({ 
          user: store.getState().auth.user, 
          token: accessToken 
        }));

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
