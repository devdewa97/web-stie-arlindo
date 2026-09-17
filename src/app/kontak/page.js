import KontakClient from './KontakClient';

export const metadata = {
  title: 'Hubungi Kami | Informasi Admisi & Kampus Terpadu STIE ARLINDO',
  description:
    'Layanan informasi pendaftaran mahasiswa baru (PMB), konsultasi perkuliahan S1 Manajemen, program beasiswa, kerjasama kemitraan korporasi, dan lokasi kampus terpadu STIE ARLINDO Bekasi.',
  keywords: [
    'Kontak STIE ARLINDO',
    'Alamat Kampus STIE Arlindo',
    'Hotline PMB STIE Arlindo',
    'WhatsApp Admisi Arlindo',
    'Lokasi STIE Arlindo Bekasi',
    'Email Resmi STIE Arlindo',
    'Konsultasi Kuliah Manajemen',
  ],
  alternates: {
    canonical: '/kontak',
  },
  openGraph: {
    title: 'Hubungi Kami — STIE ARLINDO',
    description:
      'Konsultasi pendaftaran mahasiswa baru, beasiswa, kerjasama industri, dan lokasi kampus terpadu STIE ARLINDO Bekasi.',
    url: 'https://arlindo.ac.id/kontak',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Kampus Terpadu STIE ARLINDO Bekasi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hubungi Kami — STIE ARLINDO',
    description:
      'Konsultasi pendaftaran mahasiswa baru, beasiswa, kerjasama industri, dan lokasi kampus terpadu STIE ARLINDO Bekasi.',
    images: ['/images/hero-bg.png'],
  },
};

export default function KontakPage() {
  return <KontakClient />;
}
