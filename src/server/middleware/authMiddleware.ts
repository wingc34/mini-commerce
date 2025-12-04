import { TRPCError } from '@trpc/server';
import prisma from '@/lib/prisma';
import { middleware } from '@/server/trpc';
import { UserContext } from '@/server/types/user';

export const authMiddleware = middleware(async ({ next, ctx }) => {
  const context = ctx as UserContext;
  try {
    if (!context.session || !context.session.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    const userExists = await prisma.user.findUnique({
      where: { id: context.session.user.id },
    });
    if (!userExists) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  } catch (error) {
    console.error('error', error);
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});
