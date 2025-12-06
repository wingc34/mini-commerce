import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/server/router/_app';
import { createContext } from '@/server/context';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(),
    onError(opts) {
      const { error } = opts;
      console.error('Error:', error);
      throw new Error(`${error.code} ${error.message}`);
    },
  });

export { handler as GET, handler as POST };
