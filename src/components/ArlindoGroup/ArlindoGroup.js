import Image from 'next/image';
import styles from './ArlindoGroup.module.css';

const companies = [
  {
    id: 1,
    name: 'ARLINDO MITRA PERKASA',
    subName: 'Holding Company',
    sector: 'Investasi & Manajemen Korporasi',
    tag: 'Holding Company',
    logo: '/images/logos/logo-arlindo-mitra-perkasa-cropped.png',
    aspect: 'square',
  },
  {
    id: 2,
    name: 'ARLINDO TEKNOLOGI INFORMASI',
    subName: 'Digital & Software Solutions',
    sector: 'Solusi Digital & Perangkat Lunak',
    tag: 'Teknologi Informasi',
    logo: '/images/logos/logo-arlindo-teknologi-informasi-cropped.png',
    aspect: 'square',
  },
  {
    id: 3,
    name: 'ARLINDO DIGITAL PRINTING',
    subName: 'Grafika & Industrial Packaging',
    sector: 'Percetakan & Packaging Industri',
    tag: 'Percetakan Digital',
    logo: '/images/logos/logo-arlindo-digital-printing-cropped.png',
    aspect: 'square',
  },
  {
    id: 4,
    name: 'ARLINDO RESORT',
    subName: 'Hospitality & Luxury Villa',
    sector: 'Perhotelan, Rekreasi & Pariwisata',
    tag: 'Hospitality & Resort',
    logo: '/images/logos/logo-arlindo-resort-cropped.png',
    aspect: 'wide',
  },
  {
    id: 5,
    name: 'ARDHANI TOUR & TRAVEL',
    subName: 'Perjalanan Wisata & Umrah',
    sector: 'Biro Perjalanan, Wisata & Tiket',
    tag: 'Tour & Travel',
    logo: '/images/logos/logo-ardhani-tour-travel-cropped.png',
    aspect: 'wide',
  },
  {
    id: 6,
    name: 'STIE ARLINDO',
    subName: 'Arlindo School of Management',
    sector: 'Pendidikan Tinggi Bisnis & Manajemen',
    tag: 'Perguruan Tinggi',
    logo: '/images/logos/logo-stie-arlindo-cropped.png',
    aspect: 'wide',
  },
  {
    id: 7,
    name: 'PT ARLINDO GASOIL UTAMA',
    subName: 'Energy & Fuel Distribution',
    sector: 'Energi, Migas & Bahan Bakar',
    tag: 'Energi & Bahan Bakar',
    logo: '/images/logos/logo-arlindo-mitra-perkasa-cropped.png',
    aspect: 'square',
  },
];

export default function ArlindoGroup() {
  // Duplikat array agar menghasilkan track 14 item yang berputar secara mulus (infinite marquee)
  const marqueeItems = [...companies, ...companies];

  return (
    <section className={styles.ecosystemSection} aria-label="Ekosistem Arlindo Group">
      <div className={styles.ecosystemContainer}>
        {/* Header Ribbon */}
        <div className={styles.headerWrap}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>JARINGAN BISNIS ARLINDO GROUP</span>
          </div>
          <h3 className={styles.title}>
            Sinergi Ekosistem <span className={styles.titleGold}>Anak Perusahaan Arlindo Group</span>
          </h3>
          <p className={styles.subtitle}>
            Menghubungkan mahasiswa STIE ARLINDO dengan kesempatan magang industri, riset korporasi, dan prioritas penyerapan karir di berbagai sektor usaha.
          </p>
        </div>

        {/* Infinite Moving Marquee Ticker */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={styles.companyCard}
                title={`${item.name} - ${item.sector}`}
              >
                {/* Official Logo Frame */}
                <div className={styles.logoFrame}>
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={220}
                    height={70}
                    className={`${styles.logoImg} ${item.aspect === 'wide' ? styles.logoWide : styles.logoSquare}`}
                  />
                </div>

                {/* Card Bottom Meta */}
                <div className={styles.cardFooter}>
                  <span className={styles.sectorTag}>{item.tag}</span>
                  <h4 className={styles.companyName}>{item.name}</h4>
                  <span className={styles.sectorDetail}>{item.sector}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className={styles.footerNote}>
          <span className={styles.noteIndicator}>✦</span>
          <span>Arahkan kursor pada logo perusahaan untuk menjeda gerakan</span>
        </div>
      </div>
    </section>
  );
}
