import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import type { StateCreator } from 'zustand';

vi.mock('zustand', async (importOriginal) => {
  const actual = await importOriginal<typeof import('zustand')>();

  // handle create<T>()(...) Mock
  const customCreate: <T>(
    stateCreator?: StateCreator<T>
  ) => T | typeof customCreate = <T>(stateCreator?: StateCreator<T>) => {
    if (!stateCreator) return customCreate;
    return actual.create<T>(stateCreator);
  };

  return {
    ...actual,
    create: customCreate,
  };
});

//  mock persist
vi.mock('zustand/middleware', async (importOriginal) => {
  const actual = await importOriginal<typeof import('zustand/middleware')>();
  return {
    ...actual,
    persist: (config: unknown) => config,
  };
});
