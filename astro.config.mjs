import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  site: 'https://digid.co',
  integrations: [react(), keystatic()],
});
