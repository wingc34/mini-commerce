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
      defaultAddress: {
        id: string;
        fullName: string;
        phone: string;
        city: string;
        country: string;
        line1: string;
        postal: string;
      };
    } & DefaultSession['user'];
  }
}
