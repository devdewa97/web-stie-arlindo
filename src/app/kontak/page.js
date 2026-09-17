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
};

export default function KontakPage() {
  return <KontakClient />;
}
