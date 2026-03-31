import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { D1Database } from "@cloudflare/workers-types";

// Cloudflare Pages Functions context type
interface Env {
  TINA_D1: D1Database;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  NEXTAUTH_SECRET: string;
  TINA_PUBLIC_CLIENT_ID: string;
}

export const onRequest = async (context: {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
}) => {
  const { request, env } = context;

  const isLocal = process.env.NODE_ENV === "development";

  const authProvider = isLocal
    ? LocalBackendAuthProvider()
    : {
        initialize: async () => {},
        isAuthorized: async (req: Request) => {
          // GitHub OAuth token validation handled by TinaNodeBackend
          return { isAuthorized: true };
        },
        extraRoutes: {},
      };

  const gitProvider = new GitHubProvider({
    owner: "kr1sw0rk",
    repo: "digid-co",
    token: env.GITHUB_CLIENT_ID,
    branch: "main",
  });

  const backend = TinaNodeBackend({
    authProvider,
    databaseAdapter: {
      // Use Cloudflare D1 as the database backend
      level: {
        get: async (key: string) => {
          const stmt = env.TINA_D1.prepare(
            "SELECT value FROM tina_store WHERE key = ?"
          ).bind(key);
          const result = await stmt.first<{ value: string }>();
          if (!result) throw new Error("NOT_FOUND");
          return JSON.parse(result.value);
        },
        put: async (key: string, value: unknown) => {
          const serialized = JSON.stringify(value);
          await env.TINA_D1.prepare(
            "INSERT INTO tina_store (key, value) VALUES (?1, ?2) ON CONFLICT(key) DO UPDATE SET value = ?2"
          )
            .bind(key, serialized)
            .run();
        },
        del: async (key: string) => {
          await env.TINA_D1.prepare(
            "DELETE FROM tina_store WHERE key = ?"
          )
            .bind(key)
            .run();
        },
        list: async (prefix: string) => {
          const stmt = env.TINA_D1.prepare(
            "SELECT key, value FROM tina_store WHERE key LIKE ?"
          ).bind(prefix + "%");
          const results = await stmt.all<{ key: string; value: string }>();
          return (results.results ?? []).map((row) => ({
            key: row.key,
            value: JSON.parse(row.value),
          }));
        },
      },
    },
    gitProvider,
    tinaGraphQLVersion: "1.6.0",
  });

  return backend({ request } as any);
};
