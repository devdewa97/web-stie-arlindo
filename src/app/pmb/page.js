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
};

export default function PMBPage() {
  return <PMBClient />;
}
