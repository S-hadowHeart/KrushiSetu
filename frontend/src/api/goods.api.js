import api from '../lib/apiClient';

export const goodsApi = {
  list: (params) => api.get('/goods', { params }).then((r) => r.data),
  get: (id) => api.get(`/goods/${id}`).then((r) => r.data),
  create: (payload) => api.post('/goods', payload).then((r) => r.data),
  update: (id, payload) => api.put(`/goods/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/goods/${id}`).then((r) => r.data),
};
