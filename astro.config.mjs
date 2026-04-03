import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  site: 'https://digid.co',
  integrations: [keystatic()],
});
