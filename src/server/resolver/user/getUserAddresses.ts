import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { UserContext } from '@/server/types/user';
import { authMiddleware } from '@/server/middleware/authMiddleware';

export const getUserAddresses = procedure
  .use(authMiddleware)
  .query(async ({ ctx }) => {
    try {
      const userId = (ctx as UserContext).session.user.id;
      const addresses = await prisma.address.findMany({
        where: {
          userId: userId,
          deletedAt: null,
        },
        omit: {
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        success: true,
        data: addresses,
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        data: [],
      };
    }
  });
