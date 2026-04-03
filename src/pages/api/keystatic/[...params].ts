export const prerender = false;
import { makeRouteHandler } from '@keystatic/astro/api';
import keystaticConfig from '../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config: keystaticConfig,
});
