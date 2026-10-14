import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { defineConfig } from 'astro/config';

const isDevelopmentServer = process.argv.includes('dev');

export default defineConfig({
  site: 'https://redrox-interior-preview.netlify.app',
  output: 'static',
  adapter: isDevelopmentServer ? undefined : netlify(),
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
