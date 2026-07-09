import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Each test file spins up a full jsdom + Next/React environment (~13s of the
    // run is environment setup). Running every file's fork in parallel peaks memory
    // hard enough to get the runner OOM-killed in constrained CI/containers, so we
    // run files sequentially. All tests still run; only wall-clock parallelism is
    // traded away for a deterministic green bar.
    fileParallelism: false,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.next', 'out'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'vitest.setup.ts',
        '**/*.config.{js,ts}',
        '**/types.ts',
        '**/*.d.ts',
        'scripts/',
        '.next/',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
