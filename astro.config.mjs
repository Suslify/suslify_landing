import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://suslify.netlify.app',
  integrations: [tailwind()],
});
