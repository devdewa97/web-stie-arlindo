import PMBClient from './PMBClient';

export const metadata = {
  title: 'Penerimaan Mahasiswa Baru (PMB) S1 Manajemen | STIE ARLINDO',
  description:
    'Pendaftaran Mahasiswa Baru STIE ARLINDO Tahun Akademik 2026/2027. Kuliah S1 Manajemen Terakreditasi dengan 4 konsentrasi terapan, biaya terjangkau dapat dicicil, program beasiswa KIP Kuliah, dan kelas reguler serta karyawan.',
  keywords: [
    'PMB STIE ARLINDO',
    'Pendaftaran Mahasiswa Baru Bekasi',
    'Kuliah S1 Manajemen Bekasi',
    'Biaya Kuliah STIE Arlindo',
    'Beasiswa KIP Kuliah Bekasi',
    'Kelas Karyawan Manajemen',
    'Daftar Kuliah Online 2026',
  ],
  alternates: {
    canonical: '/pmb',
  },
  openGraph: {
    title: 'Pendaftaran Mahasiswa Baru (PMB) — STIE ARLINDO',
    description:
      'Daftar kuliah S1 Manajemen terakreditasi. Biaya terjangkau, beasiswa KIP Kuliah, kelas reguler & karyawan. Tahun Akademik 2026/2027.',
    url: 'https://arlindo.ac.id/pmb',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Pendaftaran Mahasiswa Baru STIE ARLINDO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pendaftaran Mahasiswa Baru (PMB) — STIE ARLINDO',
    description:
      'Daftar kuliah S1 Manajemen terakreditasi. Biaya terjangkau, beasiswa KIP Kuliah, kelas reguler & karyawan.',
    images: ['/images/hero-bg.png'],
  },
};

export default function PMBPage() {
  return <PMBClient />;
}
