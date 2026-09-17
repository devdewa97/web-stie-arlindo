import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BackToTop from '@/components/BackToTop/BackToTop';
import LiveChat from '@/components/LiveChat/LiveChat';
import PopupBanner from '@/components/PopupBanner/PopupBanner';
import PageLoader from '@/components/PageLoader/PageLoader';

export const metadata = {
  title: {
    default: 'STIE ARLINDO - Sekolah Tinggi Ilmu Ekonomi Arlindo',
    template: '%s | STIE ARLINDO'
  },
  description: 'STIE ARLINDO - Sekolah Tinggi Ilmu Ekonomi Arlindo, Bekasi. Program Studi S1 Manajemen dengan 4 konsentrasi. Menjadi lembaga pendidikan tinggi manajemen dan ekonomi yang unggul dan bermartabat di ASEAN pada tahun 2030.',
  keywords: ['STIE ARLINDO', 'kuliah', 'manajemen', 'ekonomi', 'Bekasi', 'S1', 'perguruan tinggi'],
  openGraph: {
    title: 'STIE ARLINDO - Sekolah Tinggi Ilmu Ekonomi Arlindo',
    description: 'Program Studi S1 Manajemen dengan 4 konsentrasi. Kampus di Bekasi di bawah naungan Arlindo Group.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PageLoader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <LiveChat />
        <PopupBanner />
      </body>
    </html>
  );
}
