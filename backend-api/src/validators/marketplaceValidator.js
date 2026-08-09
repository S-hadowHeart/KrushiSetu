const { z } = require('zod');

const createGoodSchema = z.object({
  name: z.string().min(1),
  images: z.array(z.string()).optional(),
  minQty: z.number().nonnegative(),
  maxQty: z.number().nonnegative(),
  priceMin: z.number().nonnegative(),
  priceMax: z.number().nonnegative(),
  locations: z.array(z.string().min(1)).nonempty(),
  deliveryModes: z.array(z.string()).optional(),
  paymentModes: z.array(z.string()).optional(),
  description: z.string().optional(),
  availableFrom: z.string().optional(),
});

const createNeedSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  qtyNeeded: z.number().nonnegative(),
  locations: z.array(z.string().min(1)).nonempty(),
  priceMin: z.number().nonnegative().optional(),
  priceMax: z.number().nonnegative().optional(),
  deliveryMode: z.string().optional(),
  paymentMode: z.string().optional(),
  expiresAt: z.string().optional(),
});

const listGoodsSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  deliveryMode: z.string().optional(),
  farmerId: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(),
});

module.exports = {
  createGoodSchema,
  createNeedSchema,
  listGoodsSchema,
};
