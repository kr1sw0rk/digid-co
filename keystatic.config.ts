import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'kr1sw0rk',
      name: 'digid-co',
    },
  },
  ui: {
    brand: { name: 'digid.co' },
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'content/homepage/',
      schema: {
        tagline: fields.text({ label: 'Tagline' }),
        contactEmail: fields.text({ label: 'Contact Email' }),
        footerText: fields.text({
          label: 'Footer Text',
          multiline: true,
        }),
      },
    }),
  },
});
