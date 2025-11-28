import { router } from '../trpc';
import { productRouter } from './product';
import { orderRouter } from './order';
import { authRouter } from './auth';
import { userRouter } from './user';
// Root router
export const appRouter = router({
  product: productRouter,
  order: orderRouter,
  auth: authRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
