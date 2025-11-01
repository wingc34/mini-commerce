import { PrismaClient, Prisma } from '@/generated/prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.usersCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.users.create({ data: u });
  }
}

main();
