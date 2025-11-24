import { createOrder } from '@/server/resolver/order/createOrder';

import { router } from '../trpc';

export const orderRouter = router({
  createOrder,
});
