import { defineConfig, defineSchema } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      name: "page",
      label: "Pages",
      path: "content/pages",
      format: "md",
      fields: [
        {
          type: "string",
          name: "tagline",
          label: "Tagline",
          required: true,
        },
        {
          type: "string",
          name: "contactEmail",
          label: "Contact Email",
          required: true,
        },
        {
          type: "string",
          name: "footerText",
          label: "Footer Text",
          required: true,
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
});

export default defineConfig({
  schema,
  // Self-hosted configuration
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? "self-hosted",
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // Self-hosted backend config
  // The actual backend is served from /api/tina/[[route]] via Cloudflare Pages Functions
});
