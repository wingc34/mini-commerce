import { getRecommendProducts } from '@/server/resolver/product/getRecommendProducts';
import { getProducts } from '@/server/resolver/product/getProducts';

import { router } from '../trpc';

export const productRouter = router({
  getRecommendProducts,
  getProducts,
});
