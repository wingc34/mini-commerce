import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { removeWishItemZObject, UserContext } from '@/server/types/user';
import { authMiddleware } from '@/server/middleware/authMiddleware';

export const removeWishItem = procedure
  .use(authMiddleware)
  .input(removeWishItemZObject)
  .mutation(async ({ input, ctx }) => {
    try {
      await prisma.user.update({
        where: {
          id: (ctx as UserContext).session.user.id,
        },
        data: {
          wishlist: { disconnect: { id: input.productId } },
        },
      });

      return {
        success: true,
        message: 'item removed from wishlist successfully',
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'removing item from wishlist failed',
      };
    }
  });
