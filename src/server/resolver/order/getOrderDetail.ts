import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { getOrderZObject } from '@/server/types/order';
import { authMiddleware } from '@/server/middleware/authMiddleware';

export const getOrderDetail = procedure
  .use(authMiddleware)
  .input(getOrderZObject)
  .query(async ({ input }) => {
    try {
      const orderDetail = await prisma.order.findUnique({
        where: {
          id: input.id,
        },
        omit: {
          paymentIntentId: true,
          stripeSessionId: true,
          userId: true,
          shippingAddressId: true,
        },
        include: {
          shippingAddress: {
            omit: {
              userId: true,
              createdAt: true,
              updatedAt: true,
              isDefault: true,
            },
          },
          items: {
            include: {
              sku: {
                select: {
                  price: true,
                  skuCode: true,
                  attributes: true,
                  product: {
                    select: {
                      name: true,
                      images: true,
                    },
                  },
                },
              },
            },
            omit: {
              orderId: true,
              skuId: true,
            },
          },
        },
      });

      return {
        success: true,
        data: {
          ...orderDetail,
          items: orderDetail?.items.map((item) => {
            return {
              ...item,
              sku: {
                ...item.sku,
                image: item.sku.product.images[0] || null,
                name: item.sku.product.name,
                product: undefined,
              },
            };
          }),
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
