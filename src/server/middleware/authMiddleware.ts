import { TRPCError } from '@trpc/server';
import prisma from '@/lib/prisma';
import { middleware } from '@/server/trpc';
import { Session } from 'next-auth';

export const authMiddleware = middleware(async ({ next, ctx }) => {
  const session = ctx as Session;
  try {
    if (!session || !session.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!userExists) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...session, userId: session?.user.id as string },
      },
    });
  } catch (error) {
    console.error('error', error);
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});
