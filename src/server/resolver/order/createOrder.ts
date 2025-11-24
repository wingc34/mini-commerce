import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { createOrderZObject } from '@/server/types/order';
import { OrderStatus } from '@prisma/client';

export const createOrder = procedure
  .input(createOrderZObject)
  .query(async ({ input }) => {
    try {
      const order = await prisma.order.create({
        data: {
          userId: input.userId,
          total: input.total,
          status: OrderStatus.PENDING,
          shippingAddressId: input.shippingAddressId,
        },
      });

      await prisma.orderItem.createMany({
        data: input.orderItem.map((item) => {
          return {
            orderId: order.id,
            skuId: item.skuId,
            quantity: item.quantity,
            price: item.price,
          };
        }),
      });

      return {
        success: true,
        message: 'order created successfully',
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'order creation failed',
      };
    }
  });
