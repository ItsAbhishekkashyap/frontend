export async function GET() {
  const baseUrl = 'https://branqly.xyz';

  const pages = [
    '', 'features', 'pricing', 'login', 'signup', 'documentation', 'guides',
    'privacy-policy', 'terms', 'cookie-policy', 'refund-policy', 'contact-us',
    'about', 'blog', 'forgot-password', 'shortenPremium', 'premium',
    'Shipping-and-Delivery',
    'use-cases/email-marketing',
    'use-cases/print-materials',
    'use-cases/social-media'
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${baseUrl}/${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

