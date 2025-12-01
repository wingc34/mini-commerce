import { z } from 'zod';
import { Session } from 'next-auth';

export interface UserContext {
  session: Session;
}

export const updateUserAddressZObject = z.object({
  id: z.string().optional(),
  fullName: z.string(),
  phone: z.string(),
  city: z.string(),
  country: z.string(),
  line1: z.string(),
  postal: z.string(),
  isDefault: z.boolean().default(false),
});

export const updateUserInfoZObject = z.object({
  name: z.string(),
  phone_number: z.string(),
});

export const deleteUserAddressZObject = z.object({
  id: z.string(),
});
