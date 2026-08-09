export const ROLES = {
  ADMIN: 'ADMIN',
  FARMER: 'FARMER',
  BUYER: 'BUYER',
};

export const OFFER_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

export const DELIVERY_MODES = ['PICKUP', 'DELIVERY', 'DISCUSS'];
export const PAYMENT_MODES = ['CASH', 'UPI', 'BANK_TRANSFER', 'DISCUSS'];
export const ID_TYPES = ['AADHAR', 'PAN', 'VOTER_ID', 'OTHER'];

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function fileUrl(filePath) {
  if (!filePath) return null;
  if (/^https?:\/\//i.test(filePath)) return filePath;
  try {
    return new URL(filePath, API_URL).toString();
  } catch {
    return `${API_URL}${filePath}`;
  }
}
