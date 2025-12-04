import { createOrder } from '@/server/resolver/order/createOrder';
import { getUserOrder } from '@/server/resolver/order/getUserOrder';
import { getOrderDetail } from '@/server/resolver/order/getOrderDetail';

import { router } from '../trpc';

export const orderRouter = router({
  createOrder,
  getUserOrder,
  getOrderDetail,
});
