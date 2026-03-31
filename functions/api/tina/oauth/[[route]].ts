// GitHub OAuth handler for Tina CMS self-hosted
interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  NEXTAUTH_SECRET: string;
}

export const onRequest = async (context: {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
}) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const routeParam = context.params["route"];
  const route = Array.isArray(routeParam) ? routeParam.join("/") : routeParam ?? "";

  // Handle GitHub OAuth callback
  if (route === "callback") {
    const code = url.searchParams.get("code");
    if (!code) {
      return new Response("Missing code", { status: 400 });
    }

    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
    };

    if (!tokenData.access_token) {
      return new Response(
        JSON.stringify({ error: tokenData.error ?? "OAuth failed" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the token to the admin UI
    const adminUrl = new URL("/admin", url.origin);
    adminUrl.searchParams.set("access_token", tokenData.access_token);
    return Response.redirect(adminUrl.toString(), 302);
  }

  // Handle authorize redirect
  if (route === "authorize") {
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
    authUrl.searchParams.set(
      "redirect_uri",
      
    );
    authUrl.searchParams.set("scope", "repo");
    return Response.redirect(authUrl.toString(), 302);
  }

  return new Response("Not found", { status: 404 });
};
