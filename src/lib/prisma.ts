import 'dotenv/config';
import { env } from '@/lib/env';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

import ws from 'ws';
neonConfig.webSocketConstructor = ws;
// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
let client: PrismaClient | PrismaNeon;

if (env.DATABASE_ENV === 'neon') {
  const adapter = new PrismaNeon({ connectionString: env.DATABASE_URL });
  client = new PrismaClient({ adapter });
} else {
  // connect to postgresdocker
  client = new PrismaClient();
}
const prisma = globalForPrisma.prisma || client;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
