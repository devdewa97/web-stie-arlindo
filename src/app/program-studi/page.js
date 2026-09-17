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
};

export default function ProgramStudi() {
  return <ProgramStudiClient />;
}
