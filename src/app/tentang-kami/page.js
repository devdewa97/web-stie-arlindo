import TentangKamiClient from './TentangKamiClient';

export const metadata = {
  title: 'Tentang Kami | STIE ARLINDO - Profil, Visi Misi & Fasilitas Kampus',
  description:
    'Profil resmi Sekolah Tinggi Ilmu Ekonomi (STIE) ARLINDO Bekasi. Pelajari visi misi 2030, kepemimpinan akademik, legalitas BAN-PT, serta fasilitas kampus modern berstandar industri.',
  keywords: [
    'STIE ARLINDO',
    'Tentang STIE Arlindo',
    'Profil Kampus Arlindo',
    'Fasilitas Kampus STIE Arlindo',
    'Visi Misi STIE Arlindo',
    'Kuliah Manajemen Bekasi',
  ],
  alternates: {
    canonical: '/tentang-kami',
  },
  openGraph: {
    title: 'Tentang Kami — STIE ARLINDO',
    description:
      'Profil resmi STIE ARLINDO: visi misi 2030, kepemimpinan akademik, akreditasi BAN-PT, dan fasilitas kampus modern.',
    url: 'https://arlindo.ac.id/tentang-kami',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Profil Kampus STIE ARLINDO Bekasi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami — STIE ARLINDO',
    description:
      'Profil resmi STIE ARLINDO: visi misi 2030, kepemimpinan akademik, akreditasi BAN-PT, dan fasilitas kampus modern.',
    images: ['/images/hero-bg.png'],
  },
};

export default function TentangKami() {
  return <TentangKamiClient />;
}
