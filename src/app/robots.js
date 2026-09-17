export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/'],
      },
    ],
    sitemap: 'https://arlindo.ac.id/sitemap.xml',
    host: 'https://arlindo.ac.id',
  };
}
