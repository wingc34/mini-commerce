import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { pageItemSize } from '@/constant';
import { getProductsZObject } from '@/server/types/product';

export const getProducts = procedure
  .input(getProductsZObject)
  .query(async ({ input }) => {
    try {
      const products = await prisma.product.findMany({
        skip: 0 + (input.page - 1) * pageItemSize,
        take: pageItemSize,
        include: {
          skus: {
            select: {
              price: true,
              skuCode: true,
              attributes: true,
            },
          },
        },
      });

      const itemCount = await prisma.product.count();

      return {
        success: true,
        data: products,
        total: itemCount,
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        data: [],
        total: 0,
      };
    }
  });
