import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { UserContext } from '@/server/types/user';

export const getUserInfo = procedure.query(async ({ input, ctx }) => {
  const context = ctx as UserContext;
  const session = context.session as UserContext['session'];
  const user = session?.user as UserContext['session']['user'];
  const email = user?.email as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
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
