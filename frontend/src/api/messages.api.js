import api from '../lib/apiClient';

export const messagesApi = {
  send: (payload) => api.post('/messages', payload).then((r) => r.data),
  listConversations: () => api.get('/messages/conversations').then((r) => r.data),
  getThread: (userId) => api.get(`/messages/thread/${userId}`).then((r) => r.data),
  markThreadRead: (userId) => api.put(`/messages/thread/${userId}/read`, {}).then((r) => r.data),
};
