import { config, fields, collection, singleton } from '@keystatic/core';

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
      },
    }),
    navigation: singleton({
      label: 'Navigation',
      path: 'content/navigation/',
      schema: {
        items: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.text({ label: 'URL (e.g. /about)' }),
          }),
          {
            label: 'Menu Items',
            itemLabel: (props) => props.fields.label.value || 'Menu item',
          }
        ),
      },
    }),
    footer: singleton({
      label: 'Footer',
      path: 'content/footer/',
      schema: {
        text: fields.text({ label: 'Footer text', multiline: true }),
      },
    }),
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'content/pages/*/',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});
