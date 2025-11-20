import { z } from 'zod';

export const getProductsZObject = z.object({
  page: z.number().min(1).default(1),
});

export const getProductDetailZObject = z.object({
  id: z.string(),
});
export const checkStockZObject = z.object({
  productId: z.string(),
  size: z.string(),
  color: z.string(),
});
