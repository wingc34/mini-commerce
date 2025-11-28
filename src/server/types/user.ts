import { z } from 'zod';
import { Session } from 'next-auth';

export interface UserContext {
  session: Session;
}

export const getUserInfoZObject = z.object({
  email: z.string(),
});
