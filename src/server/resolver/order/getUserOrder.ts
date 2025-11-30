import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { getUserOrderZObject } from '@/server/types/order';
import { UserContext } from '@/server/types/user';
import { pageItemSize } from '@/constant';

export const getUserOrder = procedure
  .input(getUserOrderZObject)
  .query(async ({ input, ctx }) => {
    try {
      const order = await prisma.order.findMany({
        where: {
          user: {
            id: (ctx as UserContext).session.user.id,
          },
        },
        select: {
          id: true,
          createdAt: true,
          total: true,
          status: true,
          _count: {
            select: { items: true },
          },
        },
        skip: 0 + (input.page - 1) * pageItemSize,
        take: pageItemSize,
      });

      return {
        success: true,
        order: order.map((item) => ({
          id: item.id,
          createdAt: item.createdAt,
          total: item.total,
          status: item.status,
          itemCount: item._count.items,
        })),
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        order: [],
      };
    }
  });
