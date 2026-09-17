import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Galeri Foto & Dokumentasi Kampus | STIE ARLINDO',
  description:
    'Dokumentasi visual kegiatan perkuliahan, seminar akademik, wisuda sarjana, fasilitas kampus modern, dan dinamika kemahasiswaan STIE ARLINDO Bekasi.',
  keywords: [
    'Galeri STIE ARLINDO',
    'Foto Kampus STIE Arlindo',
    'Dokumentasi Wisuda STIE Arlindo',
    'Fasilitas STIE Arlindo',
    'Kegiatan Mahasiswa STIE Arlindo',
    'Kampus Manajemen Bekasi',
  ],
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Galeri Foto & Dokumentasi — STIE ARLINDO',
    description:
      'Dokumentasi visual perkuliahan, seminar, wisuda, fasilitas kampus, dan kegiatan kemahasiswaan STIE ARLINDO Bekasi.',
    url: 'https://arlindo.ac.id/gallery',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Galeri Foto Kampus STIE ARLINDO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galeri Foto & Dokumentasi — STIE ARLINDO',
    description:
      'Dokumentasi visual perkuliahan, seminar, wisuda, fasilitas kampus, dan kegiatan kemahasiswaan STIE ARLINDO.',
    images: ['/images/hero-bg.png'],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
