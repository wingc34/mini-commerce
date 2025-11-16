import { createNextApiHandler } from '@trpc/server/adapters/next';

import { env } from '@/lib/env';
import { appRouter } from '@/server/router/_app';

export default createNextApiHandler({
  router: appRouter,
  onError:
    env.APP_ENV === 'development'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
          );
        }
      : undefined,
  batching: {
    enabled: false,
  },
});
