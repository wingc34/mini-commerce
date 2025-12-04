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
      const deletedAddress = await prisma.address.update({
        where: {
          userId: (ctx as UserContext).session.user.id,
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      if (deletedAddress.isDefault) {
        const address = await prisma.address.findFirst({
          where: {
            userId: (ctx as UserContext).session.user.id,
            isDefault: false,
          },
        });
        if (address) {
          await prisma.address.update({
            where: {
              userId: (ctx as UserContext).session.user.id,
              id: address.id,
            },
            data: {
              isDefault: true,
            },
          });
        }
      }

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
