import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { UserContext } from '@/server/types/user';
import { authMiddleware } from '@/server/middleware/authMiddleware';

export const createUser = procedure
  .use(authMiddleware)
  .mutation(async ({ ctx }) => {
    const context = ctx as UserContext;
    const session = context.session as UserContext['session'];
    const user = session?.user as UserContext['session']['user'];
    const email = user?.email as string;

    try {
      if (!email || !session.user) {
        return {
          success: false,
          message: 'No active session or user email',
        };
      }

      const userExists = await prisma.user.count({
        where: { email },
      });

      if (userExists) {
        return {
          success: true,
          message: 'signed in successfully',
        };
      } else {
        const user = await prisma.user.create({
          data: {
            email,
            name: session.user.name ?? '',
            image: session.user.image ?? '',
          },
        });
        return {
          success: true,
          message: 'signed in successfully',
        };
      }
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'signin failed',
      };
    }
  });
