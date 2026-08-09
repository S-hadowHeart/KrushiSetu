import api from '../lib/apiClient';

export const needsApi = {
  list: (params) => api.get('/needs', { params }).then((r) => r.data),
  get: (id) => api.get(`/needs/${id}`).then((r) => r.data),
  create: (payload) => api.post('/needs', payload).then((r) => r.data),
  update: (id, payload) => api.put(`/needs/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/needs/${id}`).then((r) => r.data),
};
