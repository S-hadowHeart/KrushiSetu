import axios from 'axios';
import { getAccessToken, setAccessToken } from './tokenStore';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL,
  withCredentials: true, // send/receive the httpOnly refresh-token cookie
});

// Attach the current access token to every request.
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Routes that must never trigger a refresh-and-retry loop.
const AUTH_EXEMPT_PATHS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'];

let isRefreshing = false;
let pendingQueue = [];

function flushQueue(error, token) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
}

// On a 401, try exactly once to refresh the access token using the refresh-token
// cookie, then replay the original request. Concurrent 401s share a single
// in-flight refresh call instead of each firing their own.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (!response || response.status !== 401 || !config || config._retry) {
      return Promise.reject(error);
    }
    const isExempt = AUTH_EXEMPT_PATHS.some((p) => config.url?.includes(p));
    if (isExempt) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        config._retry = true;
        config.headers.Authorization = `Bearer ${token}`;
        return api(config);
      });
    }

    config._retry = true;
    isRefreshing = true;
    try {
      const { data } = await axios.post(
        `${baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      setAccessToken(data.token);
      flushQueue(null, data.token);
      config.headers.Authorization = `Bearer ${data.token}`;
      return api(config);
    } catch (refreshError) {
      setAccessToken(null);
      flushQueue(refreshError, null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
