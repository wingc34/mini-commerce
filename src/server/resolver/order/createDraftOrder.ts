import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { createDraftOrderZObject } from '@/server/types/order';
import { DraftStatus } from '@prisma/client';
import { UserContext } from '@/server/types/user';
import { authMiddleware } from '@/server/middleware/authMiddleware';

export const createDraftOrder = procedure
  .use(authMiddleware)
  .input(createDraftOrderZObject)
  .mutation(async ({ input, ctx }) => {
    const context = ctx as UserContext;

    try {
      const order = await prisma.draftOrder.create({
        data: {
          userId: context.session.user.id,
          total: input.total,
          status: DraftStatus.PENDING_PAYMENT,
          shippingAddressId: input.shippingAddressId,
        },
      });

      await prisma.draftOrderItem.createMany({
        data: input.orderItem.map((item) => {
          return {
            draftOrderId: order.id,
            skuId: item.skuId,
            quantity: item.quantity,
            price: item.price,
          };
        }),
      });

      return {
        success: true,
        message: 'draft order created successfully',
        id: order.id,
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'draft order creation failed',
        id: '',
      };
    }
  });
