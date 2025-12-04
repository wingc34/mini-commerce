import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { deleteUserAddressZObject } from '@/server/types/user';
import { UserContext } from '@/server/types/user';
import { authMiddleware } from '@/server/middleware/authMiddleware';

export const deleteUserAddress = procedure
  .use(authMiddleware)
  .input(deleteUserAddressZObject)
  .mutation(async ({ input, ctx }) => {
    try {
      await prisma.address.update({
        where: {
          userId: (ctx as UserContext).session.user.id,
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        success: true,
        message: 'user address deleted successfully',
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'user address delete failed',
      };
    }
  });
