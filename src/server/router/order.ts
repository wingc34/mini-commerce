import { createOrder } from '@/server/resolver/order/createOrder';
import { getOrder } from '@/server/resolver/order/getOrder';
import { getUserOrder } from '@/server/resolver/order/getUserOrder';

import { router } from '../trpc';

export const orderRouter = router({
  createOrder,
  getOrder,
  getUserOrder,
});
