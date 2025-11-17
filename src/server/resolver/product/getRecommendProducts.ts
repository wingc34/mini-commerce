import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';

export const getRecommendProducts = procedure.query(async ({}) => {
  try {
    const itemCount = await prisma.product.count();
    const randomOffset = Math.max(0, Math.floor(Math.random() * itemCount) - 4);

    const products = await prisma.product.findMany({
      skip: randomOffset,
      take: 4,
      include: {
        skus: {
          select: {
            price: true,
            skuCode: true,
          },
        },
      },
    });

    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error('error', error);
    return {
      success: false,
      data: [],
    };
  }
});
