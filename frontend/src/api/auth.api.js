import api from '../lib/apiClient';

export const authApi = {
  register: (payload) => api.post('/auth/register', payload).then((r) => r.data),
  login: (payload) => api.post('/auth/login', payload).then((r) => r.data),
  refresh: () => api.post('/auth/refresh', {}).then((r) => r.data),
  logout: () => api.post('/auth/logout', {}).then((r) => r.data),
  verifyEmail: (token) => api.get('/auth/verify', { params: { token } }).then((r) => r.data),
  resendVerification: (email) => api.post('/auth/resend-verification', { email }).then((r) => r.data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then((r) => r.data),
  resetPassword: (payload) => api.post('/auth/reset-password', payload).then((r) => r.data),
};
