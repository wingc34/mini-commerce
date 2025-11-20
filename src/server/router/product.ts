import { getRecommendProducts } from '@/server/resolver/product/getRecommendProducts';
import { getProducts } from '@/server/resolver/product/getProducts';
import { getProductDetail } from '@/server/resolver/product/getProductDetail';
import { checkStock } from '@/server/resolver/product/checkStock';

import { router } from '../trpc';

export const productRouter = router({
  getRecommendProducts,
  getProducts,
  getProductDetail,
  checkStock,
});
