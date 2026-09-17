import ProgramStudiClient from './ProgramStudiClient';

export const metadata = {
  title: 'Program Studi S1 Manajemen | STIE ARLINDO - 4 Konsentrasi Unggulan',
  description:
    'Program Studi S1 Manajemen STIE ARLINDO Terakreditasi BAN-PT dengan 4 konsentrasi keahlian: Keuangan & Inklusi Keuangan, Pemasaran Digital, SDM & Manajemen Proyek, serta Operasional & Berkelanjutan.',
  keywords: [
    'Program Studi STIE ARLINDO',
    'S1 Manajemen Bekasi',
    'Konsentrasi Manajemen Keuangan',
    'Pemasaran Digital STIE Arlindo',
    'Manajemen SDM Bekasi',
    'Manajemen Operasional',
    'Kuliah S1 Manajemen Terakreditasi',
  ],
  alternates: {
    canonical: '/program-studi',
  },
  openGraph: {
    title: 'Program Studi S1 Manajemen — STIE ARLINDO',
    description:
      'S1 Manajemen terakreditasi BAN-PT dengan 4 konsentrasi: Keuangan, Pemasaran Digital, SDM, dan Operasional. Kurikulum berbasis industri.',
    url: 'https://arlindo.ac.id/program-studi',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Program Studi S1 Manajemen STIE ARLINDO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Program Studi S1 Manajemen — STIE ARLINDO',
    description:
      'S1 Manajemen terakreditasi BAN-PT dengan 4 konsentrasi: Keuangan, Pemasaran Digital, SDM, dan Operasional.',
    images: ['/images/hero-bg.png'],
  },
};

export default function ProgramStudi() {
  return <ProgramStudiClient />;
}
