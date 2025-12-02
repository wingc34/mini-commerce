import { SKU } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      wishlist: {
        id: string;
        name: string;
        images: string[];
        price: number;
      }[];
    } & DefaultSession['user'];
  }
}
