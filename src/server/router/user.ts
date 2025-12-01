import { getUserInfo } from '@/server/resolver/user/getUserInfo';
import { updateUserInfo } from '@/server/resolver/user/updateUserInfo';
import { getUserAddresses } from '@/server/resolver/user/getUserAddresses';
import { updateUserAddress } from '@/server/resolver/user/updateUserAddress';
import { deleteUserAddress } from '@/server/resolver/user/deleteUserAddress';

import { router } from '../trpc';

export const userRouter = router({
  getUserInfo,
  updateUserInfo,
  getUserAddresses,
  updateUserAddress,
  deleteUserAddress,
});
