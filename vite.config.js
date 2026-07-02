import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const page = (path) => resolve(__dirname, path);

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: page('index.html'),
        works: page('works/index.html'),
        request: page('request/index.html'),
        about: page('about/index.html'),
        notFound: page('404.html')
      }
    }
  }
});
