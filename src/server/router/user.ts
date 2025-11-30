import { getUserInfo } from '@/server/resolver/user/getUserInfo';
import { updateUserInfo } from '@/server/resolver/user/updateUserInfo';

import { router } from '../trpc';

export const userRouter = router({
  getUserInfo,
  updateUserInfo,
});
