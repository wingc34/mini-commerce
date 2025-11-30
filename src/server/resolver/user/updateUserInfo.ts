import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { updateUserInfoZObject } from '@/server/types/user';
import { UserContext } from '@/server/types/user';

export const updateUserInfo = procedure
  .input(updateUserInfoZObject)
  .mutation(async ({ input, ctx }) => {
    const context = ctx as UserContext;
    const session = context.session as UserContext['session'];
    const user = session?.user as UserContext['session']['user'];
    const email = user?.email as string;

    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name: input.name,
          phone_number: input.phone_number,
        },
      });

      return {
        success: true,
        message: 'user updated successfully',
      };
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'user update failed',
        id: '',
      };
    }
  });
