import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { updateUserAddressZObject } from '@/server/types/user';
import { UserContext } from '@/server/types/user';
import { authMiddleware } from '@/server/middleware/authMiddleware';

export const updateUserAddress = procedure
  .use(authMiddleware)
  .input(updateUserAddressZObject)
  .mutation(async ({ input, ctx }) => {
    try {
      if (input.id) {
        if (input.isDefault) {
          // If setting this address as default, unset previous default addresses
          await prisma.address.updateMany({
            where: {
              userId: (ctx as UserContext).session.user.id,
              isDefault: true,
            },
            data: {
              isDefault: false,
            },
          });
        }
        await prisma.address.update({
          where: {
            userId: (ctx as UserContext).session.user.id,
            id: input.id,
          },
          data: {
            fullName: input.fullName,
            phone: input.phone,
            city: input.city,
            country: input.country,
            line1: input.line1,
            postal: input.postal,
            isDefault: input.isDefault,
          },
        });
      } else {
        const addressCount = await prisma.address.count({
          where: {
            userId: (ctx as UserContext).session.user.id,
          },
        });

        // If this is the first address, set it as default
        await prisma.address.create({
          data: {
            userId: (ctx as UserContext).session.user.id,
            fullName: input.fullName,
            phone: input.phone,
            city: input.city,
            country: input.country,
            line1: input.line1,
            postal: input.postal,
            isDefault: addressCount === 0 ? true : input.isDefault,
          },
        });
      }

      return {
        success: true,
        message: 'user address updated successfully',
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'user address update failed',
      };
    }
  });
