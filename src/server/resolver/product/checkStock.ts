import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { checkStockZObject } from '@/server/types/product';

export const checkStock = procedure
  .input(checkStockZObject)
  .query(async ({ input }) => {
    try {
      const attr = { size: input.size, color: input.color };
      const sku = await prisma.sKU.findMany({
        where: {
          productId: input.productId,
          attributes: {
            equals: attr,
          },
          stock: {
            gt: 0,
          },
        },
        select: {
          stock: true,
        },
      });

      return {
        success: true,
        inStock: sku.length > 0,
        sku: sku,
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        inStock: false,
      };
    }
  });
