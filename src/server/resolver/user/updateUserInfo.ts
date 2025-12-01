import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { updateUserInfoZObject } from '@/server/types/user';
import { UserContext } from '@/server/types/user';

export const updateUserInfo = procedure
  .input(updateUserInfoZObject)
  .mutation(async ({ input, ctx }) => {
    try {
      await prisma.user.update({
        where: {
          id: (ctx as UserContext).session.user.id,
        },
        data: {
          name: input.name,
          phone_number: input.phone_number,
        },
      });

      return {
        success: true,
        message: 'user updated successfully',
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'user update failed',
        id: '',
      };
    }
  });
