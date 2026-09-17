import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BackToTop from '@/components/BackToTop/BackToTop';
import LiveChat from '@/components/LiveChat/LiveChat';
import PopupBanner from '@/components/PopupBanner/PopupBanner';
import PageLoader from '@/components/PageLoader/PageLoader';

export const metadata = {
  metadataBase: new URL('https://arlindo.ac.id'),
  title: {
    default: 'STIE ARLINDO - Sekolah Tinggi Ilmu Ekonomi Arlindo',
    template: '%s | STIE ARLINDO'
  },
  description: 'STIE ARLINDO - Sekolah Tinggi Ilmu Ekonomi Arlindo, Bekasi. Program Studi S1 Manajemen dengan 4 konsentrasi. Menjadi lembaga pendidikan tinggi manajemen dan ekonomi yang unggul dan bermartabat di ASEAN pada tahun 2030.',
  keywords: ['STIE ARLINDO', 'kuliah', 'manajemen', 'ekonomi', 'Bekasi', 'S1', 'perguruan tinggi', 'Sekolah Tinggi Ilmu Ekonomi', 'kampus Bekasi', 'kuliah murah Bekasi'],
  authors: [{ name: 'STIE ARLINDO', url: 'https://arlindo.ac.id' }],
  creator: 'STIE ARLINDO',
  publisher: 'STIE ARLINDO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'STIE ARLINDO - Sekolah Tinggi Ilmu Ekonomi Arlindo',
    description: 'Program Studi S1 Manajemen dengan 4 konsentrasi. Kampus di Bekasi di bawah naungan Arlindo Group.',
    url: 'https://arlindo.ac.id',
    siteName: 'STIE ARLINDO',
    type: 'website',
    locale: 'id_ID',
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
    title: 'STIE ARLINDO - Sekolah Tinggi Ilmu Ekonomi Arlindo',
    description: 'Program Studi S1 Manajemen dengan 4 konsentrasi. Kampus di Bekasi di bawah naungan Arlindo Group.',
    images: ['/images/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
};

// JSON-LD Structured Data: Organization + EducationalOrganization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'CollegeOrUniversity'],
  name: 'STIE ARLINDO',
  alternateName: 'Sekolah Tinggi Ilmu Ekonomi Arlindo',
  url: 'https://arlindo.ac.id',
  logo: 'https://arlindo.ac.id/images/hero-bg.png',
  description:
    'Sekolah Tinggi Ilmu Ekonomi (STIE) ARLINDO adalah perguruan tinggi di Bekasi yang menyelenggarakan Program Studi S1 Manajemen dengan 4 konsentrasi unggulan, di bawah naungan Arlindo Group.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Raya Hankam No.54, RT.002/RW.004, Jatiraden',
    addressLocality: 'Bekasi',
    addressRegion: 'Jawa Barat',
    postalCode: '17422',
    addressCountry: 'ID',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+62-21-845-67890',
      contactType: 'admissions',
      areaServed: 'ID',
      availableLanguage: ['Indonesian', 'English'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/stiearlindo/',
    'https://www.facebook.com/stiearlindo/',
    'https://www.youtube.com/@stiearlindo',
  ],
  foundingDate: '2010',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Arlindo Group',
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
