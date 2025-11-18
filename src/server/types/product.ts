import { z } from 'zod';

export const getProductsZObject = z.object({
  page: z.number().min(1).default(1),
});
