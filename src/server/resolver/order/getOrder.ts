import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { getOrderZObject } from '@/server/types/order';

export const getOrder = procedure
  .input(getOrderZObject)
  .query(async ({ input }) => {
    try {
      const orderItem = await prisma.orderItem.findMany({
        where: {
          orderId: input.id,
        },
        include: {
          sku: {
            select: {
              price: true,
              skuCode: true,
              attributes: true,
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      const shippingAddress = await prisma.order.findUnique({
        where: {
          id: input.id,
        },
        select: {
          shippingAddress: {
            omit: {
              userId: true,
              createdAt: true,
              updatedAt: true,
              isDefault: true,
            },
          },
        },
      });

      return {
        success: true,
        orderItem: orderItem,
        shippingAddress: shippingAddress?.shippingAddress,
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        orderItem: [],
        shippingAddress: {},
      };
    }
  });
