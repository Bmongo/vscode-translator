import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
  resolve: {
    conditions: ['node'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    exclude: ['vscode'],
  },
})
