import { Suspense } from 'react';
import BeritaClient from './BeritaClient';
import { getNewsSafe, getCategories } from '@/lib/api';

export const metadata = {
  title: 'Berita & Pengumuman Resmi | STIE ARLINDO',
  description:
    'Warta kegiatan akademik, prestasi mahasiswa, seminar nasional, kemitraan industri, dan informasi resmi dari Sekolah Tinggi Ilmu Ekonomi (STIE) ARLINDO.',
  keywords: [
    'Berita STIE ARLINDO',
    'Pengumuman STIE Arlindo',
    'Seminar STIE Arlindo',
    'Prestasi Mahasiswa Arlindo',
    'Kemitraan Arlindo Group',
  ],
  alternates: {
    canonical: '/berita',
  },
  openGraph: {
    title: 'Berita & Pengumuman Resmi — STIE ARLINDO',
    description:
      'Warta kegiatan akademik, prestasi mahasiswa, seminar nasional, kemitraan industri, dan informasi resmi STIE ARLINDO.',
    url: 'https://arlindo.ac.id/berita',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Berita & Pengumuman STIE ARLINDO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berita & Pengumuman Resmi — STIE ARLINDO',
    description:
      'Warta kegiatan akademik, prestasi mahasiswa, seminar nasional, kemitraan industri, dan informasi resmi STIE ARLINDO.',
    images: ['/images/hero-bg.png'],
  },
};

const defaultNewsData = [
  {
    id: 1,
    slug: 'pendaftaran-mahasiswa-baru-2026-2027',
    title: 'Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027 Dibuka',
    excerpt:
      'STIE ARLINDO membuka pendaftaran mahasiswa baru untuk tahun akademik 2026/2027. Dapatkan beasiswa dan potongan biaya kuliah bagi pendaftar awal.',
    category: 'PMB',
    category_slug: 'pmb',
    date: '1 Sep 2026',
    featured: true,
    image: '/images/news-pmb.jpg',
  },
  {
    id: 2,
    slug: 'workshop-manajemen-pemasaran-digital',
    title: 'Workshop Manajemen Pemasaran Digital Bersama Praktisi Industri',
    excerpt:
      'STIE ARLINDO mengadakan workshop intensif Manajemen Pemasaran Digital yang menghadirkan praktisi industri ekosistem Arlindo Group.',
    category: 'Akademik',
    category_slug: 'akademik',
    date: '28 Aug 2026',
    featured: false,
    image: '/images/news-workshop.jpg',
  },
  {
    id: 3,
    slug: 'wisuda-angkatan-15',
    title: 'Wisuda Angkatan ke-15 STIE ARLINDO Siap Hadapi Era Global',
    excerpt:
      'Sebanyak 250 wisudawan program S1 Manajemen dilepas menuju dunia profesional dan wirausaha berskala nasional.',
    category: 'Kegiatan',
    category_slug: 'kegiatan',
    date: '20 Aug 2026',
    featured: false,
    image: '/images/news-wisuda.jpg',
  },
  {
    id: 4,
    slug: 'kerjasama-perusahaan-mitra-baru',
    title: 'STIE ARLINDO Jalin Kerjasama Strategis dengan 10 Perusahaan Mitra',
    excerpt:
      'Memperluas jaringan kerja sama, STIE ARLINDO menandatangani MoU program magang bersertifikat dan rekrutmen kerja lulusan.',
    category: 'Kerjasama',
    category_slug: 'kerjasama',
    date: '15 Aug 2026',
    featured: false,
    image: '/images/news-kerjasama.jpg',
  },
  {
    id: 5,
    slug: 'seminar-nasional-ekonomi-bisnis-berkelanjutan',
    title: 'Seminar Nasional: Inovasi Model Bisnis & Tata Kelola Berkelanjutan',
    excerpt:
      'Menghadirkan narasumber pakar ekonomi nasional dan regulator membahas arah transformasi operasional berkelanjutan.',
    category: 'Akademik',
    category_slug: 'akademik',
    date: '10 Aug 2026',
    featured: false,
    image: '/images/news-seminar.jpg',
  },
  {
    id: 6,
    slug: 'juara-kompetisi-business-plan',
    title: 'Mahasiswa STIE ARLINDO Raih Juara Kompetisi Business Plan Nasional',
    excerpt:
      'Tim mahasiswa S1 Manajemen STIE ARLINDO berhasil meraih prestasi gemilang dalam ajang kompetisi inovasi bisnis nasional.',
    category: 'Prestasi',
    category_slug: 'prestasi',
    date: '5 Aug 2026',
    featured: false,
    image: '/images/news-prestasi.jpg',
  },
];

export default async function BeritaPage({ searchParams }) {
  const resolvedParams = (await searchParams) || {};
  const initialKategori = resolvedParams.kategori || '';
  const initialQuery = resolvedParams.q || resolvedParams.search || '';

  let articles = [...defaultNewsData];
  let categories = [];

  try {
    const [newsRes, catRes] = await Promise.all([
      getNewsSafe(1, 50),
      getCategories(),
    ]);

    if (newsRes && newsRes.data && newsRes.data.length > 0) {
      const mappedApi = newsRes.data.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        category: item.category_rel ? item.category_rel.name : (item.category ? item.category.toUpperCase() : 'Umum'),
        category_slug: item.category_rel ? item.category_rel.slug : (item.category ? item.category.toLowerCase() : 'umum'),
        date: item.published_at || item.created_at,
        featured: Boolean(item.is_featured),
        image: item.image || '/images/news-pmb.jpg',
      }));

      const existingSlugs = new Set(mappedApi.map((a) => a.slug));
      const fallbackRemaining = defaultNewsData.filter((d) => !existingSlugs.has(d.slug));
      articles = [...mappedApi, ...fallbackRemaining];
    }

    if (catRes && catRes.data && catRes.data.length > 0) {
      categories = catRes.data;
    }
  } catch (err) {
    console.error('Error fetching berita server-side:', err);
  }

  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Memuat berita...</div>}>
      <BeritaClient
        initialNews={articles}
        initialCategories={categories}
        initialKategori={initialKategori}
        initialQuery={initialQuery}
      />
    </Suspense>
  );
}
