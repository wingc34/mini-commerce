import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import prisma from './lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: {
            wishlist: {
              select: {
                id: true,
                name: true,
                images: true,
                skus: {
                  select: {
                    price: true,
                  },
                },
              },
            },
            addresses: {
              where: {
                isDefault: true,
              },
              select: {
                id: true,
              },
            },
          },
        });
        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.defaultAddressId = dbUser.addresses[0]?.id || '';
          session.user.wishlist = dbUser.wishlist.map((product) => ({
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.skus.reduce(
              (min, sku) => (sku.price < min ? sku.price : min),
              product.skus[0]?.price || 0
            ),
          }));
        }
      }
      return session;
    },
  },
});
