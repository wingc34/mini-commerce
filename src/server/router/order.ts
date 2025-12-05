import { createDraftOrder } from '@/server/resolver/order/createDraftOrder';
import { getUserOrder } from '@/server/resolver/order/getUserOrder';
import { getOrderDetail } from '@/server/resolver/order/getOrderDetail';

import { router } from '../trpc';

export const orderRouter = router({
  createDraftOrder,
  getUserOrder,
  getOrderDetail,
});
