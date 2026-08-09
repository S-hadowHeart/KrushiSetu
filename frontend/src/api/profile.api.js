import api from '../lib/apiClient';

export const profileApi = {
  getProfile: () => api.get('/profile').then((r) => r.data),
};
