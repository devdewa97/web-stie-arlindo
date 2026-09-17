import { API_BASE } from '@/lib/api';

export default async function sitemap() {
  const baseUrl = 'https://arlindo.ac.id';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/program-studi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pmb`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic news/berita pages from API
  let newsPages = [];
  try {
    const res = await fetch(`${API_BASE}/news?per_page=100`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        newsPages = json.data.map((article) => ({
          url: `${baseUrl}/berita/${article.slug}`,
          lastModified: article.updated_at
            ? new Date(article.updated_at)
            : article.created_at
            ? new Date(article.created_at)
            : new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        }));
      }
    }
  } catch (err) {
    // Fallback: include known static news slugs
    const fallbackSlugs = [
      'pendaftaran-mahasiswa-baru-2026-2027',
      'workshop-manajemen-pemasaran-digital',
      'wisuda-angkatan-15',
      'kerjasama-perusahaan-mitra-baru',
      'seminar-nasional-ekonomi-bisnis-berkelanjutan',
      'juara-kompetisi-business-plan',
    ];
    newsPages = fallbackSlugs.map((slug) => ({
      url: `${baseUrl}/berita/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  }

  return [...staticPages, ...newsPages];
}
