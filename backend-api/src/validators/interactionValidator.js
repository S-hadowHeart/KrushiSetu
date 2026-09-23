const { z } = require('zod');

const offerSchema = z.object({
  qty: z.number().positive().optional(),
  price: z.number().nonnegative().optional(),
  message: z.string().max(2000).optional(),
});

const respondOfferSchema = z.object({
  status: z.enum(['ACCEPTED', 'REJECTED']),
});

const messageSchema = z.object({
  toUserId: z.coerce.number().int().positive(),
  body: z.string().trim().min(1).max(5000),
  goodId: z.coerce.number().int().positive().optional(),
  needId: z.coerce.number().int().positive().optional(),
  offerId: z.coerce.number().int().positive().optional(),
});

const verificationSchema = z.object({
  idType: z.string().trim().min(1).max(64),
  idNumber: z.string().trim().min(1).max(128),
  attachments: z.array(z.string().url()).max(10).optional(),
});

const reviewVerificationSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
});

const ratingSchema = z.object({
  targetId: z.coerce.number().int().positive(),
  type: z.enum(['USER', 'GOOD']),
  score: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional(),
});

module.exports = {
  offerSchema,
  respondOfferSchema,
  messageSchema,
  verificationSchema,
  reviewVerificationSchema,
  ratingSchema,
};