import { featured, site } from "../content/site";

export function GET() {
  const urls = ["/", ...featured.map((p) => `/work/${p.slug}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${new URL(u, site.url).href}</loc></url>`).join("\n")}
</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
