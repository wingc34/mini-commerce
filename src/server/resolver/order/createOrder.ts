import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { createOrderZObject } from '@/server/types/order';
import { OrderStatus } from '@prisma/client';
import { UserContext } from '@/server/types/user';

export const createOrder = procedure
  .input(createOrderZObject)
  .mutation(async ({ input, ctx }) => {
    const context = ctx as UserContext;

    try {
      const order = await prisma.order.create({
        data: {
          userId: context.session.user.id,
          total: input.total,
          status: OrderStatus.PENDING,
          shippingAddressId: context.session.user.defaultAddress.id,
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
        id: order.id,
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'order creation failed',
        id: '',
      };
    }
  });
