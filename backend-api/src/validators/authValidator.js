const { z } = require('zod');

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/, {
    message: 'Password must include uppercase, lowercase, number, and special character',
  });

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1),
  password: passwordSchema,
  name: z.string().min(1, { message: 'Name is required' }).max(128),
  role: z.enum(['FARMER', 'BUYER']).default('FARMER'),
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: 'Reset token is required' }),
  password: passwordSchema,
});

const verifySchema = z.object({
  token: z.string().min(1, { message: 'Verification token is required' }),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifySchema,
};
