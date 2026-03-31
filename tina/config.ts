import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.CF_PAGES_BRANCH || "main",
  clientId: null,
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  // Point the admin to our self-hosted GraphQL API
  contentApiUrlOverride: "/api/tina/gql",

  schema: {
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
  },
});
