import { z } from 'zod';
import { Session } from 'next-auth';

export interface UserContext {
  session: Session;
}

export const getUserInfoZObject = z.object({
  email: z.string(),
});
export const updateUserInfoZObject = z.object({
  name: z.string(),
  phone_number: z.string(),
});
