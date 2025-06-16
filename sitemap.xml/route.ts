export async function GET() {
 const baseUrl = 'https://branqly.xyz';


  const pages = [
    '', 'features', 'pricing', 'login', 'signup', 'documentation', 'guides',
    'privacy-policy', 'terms', 'cookie-policy', 'support', 'dashboard', 'blog'
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}/${page}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
