import { z } from 'zod';

export const createOrderZObject = z.object({
  total: z.number(),
  shippingAddressId: z.string(),
  orderItem: z.array(
    z.object({
      skuId: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

export const getOrderZObject = z.object({
  id: z.string(),
});
export const getUserOrderZObject = z.object({
  page: z.number().min(1).default(1),
});
