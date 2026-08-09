import api from '../lib/apiClient';

export const uploadsApi = {
  upload: (files) => {
    const form = new FormData();
    Array.from(files).forEach((file) => form.append('files', file));
    return api.post('/uploads', form).then((r) => r.data);
  },
};
