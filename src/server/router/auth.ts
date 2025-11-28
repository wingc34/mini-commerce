import { createUser } from '@/server/resolver/auth/createUser';

import { router } from '../trpc';

export const authRouter = router({
  createUser,
});
