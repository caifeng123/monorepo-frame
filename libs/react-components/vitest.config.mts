import { resolve } from 'path';
import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    environment: 'jsdom',
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
