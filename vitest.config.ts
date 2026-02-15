import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/tests/**/*.test.ts', 'src/tests/**/*.test.tsx'],
    setupFiles: ['./src/tests/setup-vitest.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['src/**/*'],
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
