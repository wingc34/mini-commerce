import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { addWishItemZObject, UserContext } from '@/server/types/user';

export const addWishItem = procedure
  .input(addWishItemZObject)
  .mutation(async ({ input, ctx }) => {
    try {
      await prisma.user.update({
        where: {
          id: (ctx as UserContext).session.user.id,
        },
        data: {
          wishlist: { connect: { id: input.productId } },
        },
      });

      return {
        success: true,
        message: 'item added to wishlist successfully',
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'adding item to wishlist failed',
      };
    }
  });
