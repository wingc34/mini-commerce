import { getUserInfo } from '@/server/resolver/user/getUserInfo';
import { updateUserInfo } from '@/server/resolver/user/updateUserInfo';
import { getUserAddresses } from '@/server/resolver/user/getUserAddresses';
import { updateUserAddress } from '@/server/resolver/user/updateUserAddress';
import { deleteUserAddress } from '@/server/resolver/user/deleteUserAddress';
import { addWishItem } from '@/server/resolver/user/addWishItem';
import { removeWishItem } from '@/server/resolver/user/removeWishItem';

import { router } from '../trpc';

export const userRouter = router({
  getUserInfo,
  updateUserInfo,
  getUserAddresses,
  updateUserAddress,
  deleteUserAddress,
  addWishItem,
  removeWishItem,
});
