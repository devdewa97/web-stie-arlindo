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
};

export default function GalleryPage() {
  return <GalleryClient />;
}
