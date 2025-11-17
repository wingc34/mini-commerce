import { getRecommendProducts } from '@/server/resolver/product/getRecommendProducts';

import { router } from '../trpc';

export const productRouter = router({
  getRecommendProducts,
});
