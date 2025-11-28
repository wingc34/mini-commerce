import { procedure } from '@/server/trpc';
import prisma from '@/lib/prisma';
import { Session } from 'next-auth';

interface context {
  session: Session;
}

export const createUser = procedure.mutation(async ({ ctx }) => {
  const context = ctx as context;
  const session = context.session as context['session'];
  const user = session?.user as Session['user'];
  const email = user?.email as string;

  try {
    if (!email || !session.user) {
      return {
        success: false,
        message: 'No active session or user email',
      };
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return {
        success: true,
        message: `${userExists.name} signed in successfully`,
      };
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          name: session.user.name ?? undefined,
        },
      });
      return {
        success: true,
        message: `${user.name} signed in successfully`,
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
