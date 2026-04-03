export const prerender = false;

export async function GET() {
  const results: Record<string, string> = {};

  // Check via import.meta.env (build-time Astro env)
  results["import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID"] =
    import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID ? "SET" : "MISSING";
  results["import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET"] =
    import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? "SET" : "MISSING";
  results["import.meta.env.KEYSTATIC_SECRET"] =
    import.meta.env.KEYSTATIC_SECRET ? "SET" : "MISSING";

  // Check via process.env (nodejs_compat runtime)
  results["process.env.KEYSTATIC_GITHUB_CLIENT_ID"] =
    (process.env as any)["KEYSTATIC_GITHUB_CLIENT_ID"] ? "SET" : "MISSING";
  results["process.env.KEYSTATIC_GITHUB_CLIENT_SECRET"] =
    (process.env as any)["KEYSTATIC_GITHUB_CLIENT_SECRET"] ? "SET" : "MISSING";
  results["process.env.KEYSTATIC_SECRET"] =
    (process.env as any)["KEYSTATIC_SECRET"] ? "SET" : "MISSING";

  return new Response(JSON.stringify(results, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
