import api from '../lib/apiClient';

export const verificationApi = {
  submit: (payload) => api.post('/verification', payload).then((r) => r.data),
  getForUser: (userId) => api.get(`/verification/${userId}`).then((r) => r.data),
  listPending: () => api.get('/verification').then((r) => r.data),
  review: (id, status) => api.put(`/verification/${id}`, { status }).then((r) => r.data),
};
