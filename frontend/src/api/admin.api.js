import api from '../lib/apiClient';

export const adminApi = {
  listUsers: () => api.get('/admin/users').then((r) => r.data),
  getUser: (id) => api.get(`/admin/users/${id}`).then((r) => r.data),
  suspendUser: (id) => api.put(`/admin/users/${id}/suspend`, {}).then((r) => r.data),
  listGoods: () => api.get('/admin/goods').then((r) => r.data),
  deleteGood: (id) => api.delete(`/admin/goods/${id}`).then((r) => r.data),
  listNeeds: () => api.get('/admin/needs').then((r) => r.data),
  deleteNeed: (id) => api.delete(`/admin/needs/${id}`).then((r) => r.data),
  listOffers: () => api.get('/admin/offers').then((r) => r.data),
  listMessages: (params) => api.get('/admin/messages', { params }).then((r) => r.data),
  getStats: () => api.get('/admin/stats').then((r) => r.data),
};
