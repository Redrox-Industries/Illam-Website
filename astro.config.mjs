import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://redrox-interior-preview.netlify.app',
  output: 'static',
  adapter: netlify(),
  integrations: [sitemap()],
});
