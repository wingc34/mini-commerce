import { getUserInfo } from '@/server/resolver/user/getUserInfo';

import { router } from '../trpc';

export const userRouter = router({
  getUserInfo,
});
