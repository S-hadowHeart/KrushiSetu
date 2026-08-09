import api from '../lib/apiClient';

export const ratingsApi = {
  create: (payload) => api.post('/ratings', payload).then((r) => r.data),
  listForTarget: (targetId) => api.get(`/ratings/${targetId}`).then((r) => r.data),
};
