import { router } from '../trpc';
import { productRouter } from './product';
import { orderRouter } from './order';
// Root router
export const appRouter = router({ product: productRouter, order: orderRouter });
// export type definition of API
export type AppRouter = typeof appRouter;
