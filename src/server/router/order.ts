import { createOrder } from '@/server/resolver/order/createOrder';
import { getOrder } from '@/server/resolver/order/getOrder';

import { router } from '../trpc';

export const orderRouter = router({
  createOrder,
  getOrder,
});
