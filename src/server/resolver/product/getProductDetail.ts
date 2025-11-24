import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { pageItemSize } from '@/constant';
import { getProductDetailZObject } from '@/server/types/product';

export const getProductDetail = procedure
  .input(getProductDetailZObject)
  .query(async ({ input }) => {
    try {
      const products = await prisma.product.findUnique({
        where: {
          id: input.id,
        },
        include: {
          skus: {
            select: {
              id: true,
              price: true,
              skuCode: true,
              stock: true,
              attributes: true,
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
        data: {},
      };
    }
  });
