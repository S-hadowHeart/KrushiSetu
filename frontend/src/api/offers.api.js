import api from '../lib/apiClient';

export const offersApi = {
  createForGood: (goodPublicId, payload) => api.post(`/offers/goods/${goodPublicId}`, payload).then((r) => r.data),
  createForNeed: (needPublicId, payload) => api.post(`/offers/needs/${needPublicId}`, payload).then((r) => r.data),
  listMine: () => api.get('/offers/me').then((r) => r.data),
  listSent: () => api.get('/offers/sent').then((r) => r.data),
  respond: (id, status) => api.put(`/offers/${id}/respond`, { status }).then((r) => r.data),
  counter: (id, payload) => api.post(`/offers/${id}/counter`, payload).then((r) => r.data),
};
