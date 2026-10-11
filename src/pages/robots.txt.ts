export const prerender = true;

export function GET({ site }: { site: URL }) {
  const sitemap = new URL('sitemap-index.xml', site);

  return new Response(
    `User-agent: *\nDisallow: /\nSitemap: ${sitemap.href}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
}
