import { z } from 'zod';
import { OrderStatus } from '@prisma/client';

export const createOrderZObject = z.object({
  userId: z.string(),
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
