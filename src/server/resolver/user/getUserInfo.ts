import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { UserContext } from '@/server/types/user';

export const getUserInfo = procedure.query(async ({ ctx }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: (ctx as UserContext).session.user.id,
      },
      include: {
        addresses: {
          where: {
            isDefault: true,
          },
        },
      },
      omit: {
        updatedAt: true,
      },
    });

    const orderCount = await prisma.order.count({
      where: {
        userId: user?.id,
      },
    });

    const orderAmount = await prisma.order.aggregate({
      where: {
        userId: user?.id,
      },
      _sum: {
        total: true,
      },
    });

    return {
      success: true,
      data: {
        ...user,
        orderCount,
        orderAmount:
          orderAmount._sum.total !== null ? orderAmount._sum.total : 0,
      },
    };
  } catch (error) {
    console.error('error', error);
    return {
      success: false,
      data: {},
    };
  }
});
