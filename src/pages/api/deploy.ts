export const prerender = false;

export async function POST() {
  const token = (process.env as Record<string, string>)['GITHUB_DEPLOY_TOKEN'];

  if (!token) {
    return new Response(JSON.stringify({ ok: false, error: 'GITHUB_DEPLOY_TOKEN not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch(
    'https://api.github.com/repos/kr1sw0rk/digid-co/actions/workflows/publish.yml/dispatches',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref: 'main' }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    return new Response(JSON.stringify({ ok: false, error: body }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
