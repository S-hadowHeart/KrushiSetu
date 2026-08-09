import { z } from 'zod';

// Mirrors backend src/validators/authValidator.js exactly so users get the
// same feedback client-side before a round trip to the server.
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
    'Include uppercase, lowercase, a number, and a special character'
  );

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(128),
  email: z.string().email('Enter a valid email address'),
  password: passwordSchema,
  role: z.enum(['FARMER', 'BUYER']),
});

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Mirrors backend src/validators/marketplaceValidator.js
export const goodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  minQty: z.coerce.number().nonnegative('Must be 0 or more'),
  maxQty: z.coerce.number().positive('Enter a quantity greater than 0'),
  priceMin: z.coerce.number().nonnegative('Must be 0 or more'),
  priceMax: z.coerce.number().nonnegative('Must be 0 or more'),
  locations: z.array(z.string().min(1)).min(1, 'Add at least one location'),
  deliveryModes: z.array(z.string()).optional(),
  paymentModes: z.array(z.string()).optional(),
  description: z.string().optional(),
  availableFrom: z.string().optional(),
  images: z.array(z.string()).optional(),
}).refine((d) => d.maxQty >= d.minQty, {
  message: 'Max quantity must be greater than or equal to min quantity',
  path: ['maxQty'],
}).refine((d) => d.priceMax >= d.priceMin, {
  message: 'Max price must be greater than or equal to min price',
  path: ['priceMax'],
});

// Converts empty-string form inputs to undefined before an optional numeric
// coercion, so a blank field stays "not provided" instead of becoming 0.
const optionalNumber = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? undefined : val),
  z.coerce.number().nonnegative().optional()
);

export const needSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  qtyNeeded: z.coerce.number().positive('Enter a quantity greater than 0'),
  locations: z.array(z.string().min(1)).min(1, 'Add at least one location'),
  priceMin: optionalNumber,
  priceMax: optionalNumber,
  deliveryMode: z.string().optional(),
  paymentMode: z.string().optional(),
  expiresAt: z.string().optional(),
});

export const offerSchema = z.object({
  qty: z.coerce.number().positive('Enter a quantity greater than 0'),
  price: z.coerce.number().positive('Enter a price greater than 0'),
  message: z.string().optional(),
});

export const verificationSchema = z.object({
  idType: z.string().min(1, 'Select an ID type'),
  idNumber: z.string().min(1, 'ID number is required'),
  attachments: z.array(z.string()).optional(),
});

export const ratingSchema = z.object({
  targetId: z.number(),
  type: z.enum(['user', 'goods']),
  score: z.coerce.number().int().min(1).max(5),
  comment: z.string().optional(),
  goodId: z.number().optional(),
});
