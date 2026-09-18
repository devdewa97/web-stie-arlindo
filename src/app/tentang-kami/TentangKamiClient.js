'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { getFacilities, formatImageUrl } from '@/lib/api';
import styles from './page.module.css';

/* ===== DATA FASILITAS KAMPUS (HANYA GAMBAR & NAMA) ===== */
const facilitiesData = [
  {
    id: 1,
    name: 'Laboratorium Komputer & Data Analytics',
    image: '/images/facilities/lab-komputer.jpg',
  },
  {
    id: 2,
    name: 'Perpustakaan Digital & E-Library',
    image: '/images/facilities/perpustakaan.jpg',
  },
  {
    id: 3,
    name: 'Smart Classroom & Ruang Kuliah Modern',
    image: '/images/facilities/smart-classroom.jpg',
  },
  {
    id: 4,
    name: 'Galeri Investasi & Financial Trading Lab',
    image: '/images/facilities/trading-lab.jpg',
  },
  {
    id: 5,
    name: 'Business Incubator & Co-Working Space',
    image: '/images/facilities/business-incubator.jpg',
  },
  {
    id: 6,
    name: 'Auditorium Graha Arlindo',
    image: '/images/facilities/auditorium.jpg',
  },
  {
    id: 7,
    name: 'Student Lounge & Green Courtyard',
    image: '/images/facilities/student-lounge.jpg',
  },
  {
    id: 8,
    name: 'Student Center & Creative Hub',
    image: '/images/facilities/student-center.jpg',
  },
];


/* ===== DATA PILAR KEUNGGULAN ===== */
const pillarsData = [
  {
    title: 'Kurikulum Relevan Industri & MBKM',
    desc: 'Dirancang responsif menjawab tuntutan era ekonomi digital, fintech, analitik data, dan supply chain manajemen modern.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: 'Sinergi Ekosistem Arlindo Group',
    desc: 'Mahasiswa memperoleh akses magang riil, studi kasus korporasi, serta percepatan karir di unit usaha jaringan mitra strategis.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Pembinaan Karir & Entrepreneurship Terpadu',
    desc: 'Program bimbingan karier terstruktur, pelatihan soft skills, workshop sertifikasi profesi, dan inkubasi wirausaha mandiri.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

/* ===== DATA NILAI-NILAI DASAR (CORE VALUES) ===== */
const coreValuesData = [
  {
    number: '01',
    title: 'Integrity',
    desc: 'Menjunjung tinggi kejujuran, moralitas, transparansi akademik, etika profesi bisnis, serta tanggung jawab sosial sivitas.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Excellence',
    desc: 'Berkomitmen menghadirkan mutu terbaik dalam pengajaran, penelitian terapan, tata kelola, dan layanan kemahasiswaan.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Adaptive Innovation',
    desc: 'Responsif dan terbuka terhadap transformasi teknologi digital, dinamika pasar global, serta pemecahan masalah masa depan.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Synergy',
    desc: 'Menjalin kolaborasi produktif dengan dunia industri, alumni, pemerintah, dan masyarakat demi dampak kebermanfaatan luas.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

/* ===== DATA LEGALITAS & PENJAMIN MUTU ===== */
const trustData = [
  {
    title: 'Akreditasi BAN-PT',
    subtitle: 'Program Studi S1 Manajemen Terakreditasi BAN-PT.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'Izin Resmi Kemendikbudristek',
    subtitle: 'Lembaga pendidikan tinggi swasta resmi terdaftar di Pangkalan Data Dikti (PDDIKTI).',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'Naungan LLDIKTI Wilayah IV',
    subtitle: 'Beroperasi di bawah pembinaan Lembaga Layanan Pendidikan Tinggi Wilayah IV Jabar-Banten.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Penjaminan Mutu SPMI',
    subtitle: 'Sistem Penjaminan Mutu Internal berkala untuk menjaga keunggulan mutu akademik.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 12 2 2 4-4" />
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    ),
  },
];

export default function TentangKamiClient() {
  const [facilities, setFacilities] = useState(facilitiesData);

  useEffect(() => {
    async function loadFacilities() {
      try {
        const res = await getFacilities();
        if (res?.data && res.data.length > 0) {
          const mapped = res.data.map((f) => ({
            id: f.id,
            name: f.name,
            image: formatImageUrl(f.image),
          }));
          setFacilities(mapped);
        }
      } catch {
        // Keep fallback static data
      }
    }

    loadFacilities();
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGridPattern} />
        <div className="container">
          <div className={styles.heroContent}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
              <Link href="/">Beranda</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>Tentang Kami</span>
            </div>

            {/* Title (Badge BAN-PT removed as requested) */}
            <h1 className={styles.heroTitle}>
              Membentuk Generasi Pemimpin <br />
              <span className={styles.heroHighlight}>Ekonomi &amp; Bisnis Global</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Sekolah Tinggi Ilmu Ekonomi (STIE) ARLINDO memadukan keunggulan akademik, kurikulum adaptif industri,
              serta sinergi ekosistem dunia usaha terintegrasi untuk melahirkan profesional berintegritas dan siap memimpin perubahan.
            </p>

            {/* Quick Actions */}
            <div className={styles.heroActions}>
              <a href="#fasilitas" className="btn btn-gold">
                <span>Eksplorasi Fasilitas Kampus</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
              <Link href="/kontak" className="btn btn-outline">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ===== SECTION 1: PROFIL & DEDIKASI INSTITUSI (PRECISE ALIGNMENT) ===== */}
      <section className="section" id="profil">
        <div className="container">
          <ScrollReveal>
            <div className={styles.profileGrid}>
              {/* Visual Column Left (Full Height Alignment) */}
              <div className={styles.profileVisualCol}>
                <div className={styles.imageAccentBackdrop} />
                <div className={styles.imageFrame}>
                  <Image
                    src="/images/about-campus.jpg"
                    alt="Gedung Kampus STIE ARLINDO"
                    width={640}
                    height={600}
                    className={styles.mainCampusImg}
                    priority
                  />
                  {/* Floating Accreditation Badge */}
                  <div className={styles.floatingBadge}>
                    <div className={styles.floatingBadgeIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div>
                      <div className={styles.floatingBadgeTitle}>Terakreditasi BAN-PT</div>
                      <div className={styles.floatingBadgeSubtitle}>Program Studi S1 Manajemen</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Column Right */}
              <div className={styles.profileContent}>

                <h2 className={styles.sectionTitle}>
                  Mewujudkan Pendidikan Manajemen Unggul di Jantung Pertumbuhan Kota Bekasi
                </h2>
                <div className="gold-line-left" />
                <p>
                  Sekolah Tinggi Ilmu Ekonomi (STIE) ARLINDO adalah perguruan tinggi ekonomi modern yang berlokasi strategis di
                  Kecamatan Jatisampurna, Kota Bekasi, Jawa Barat. STIE ARLINDO menyelenggarakan Program Studi <strong>S1 Manajemen</strong> dengan
                  4 konsentrasi keahlian terapan: <em>Manajemen Keuangan &amp; Inklusi Keuangan</em>, <em>Manajemen Pemasaran Digital</em>,
                  <em>Manajemen SDM &amp; Proyek</em>, serta <em>Manajemen Operasional &amp; Berkelanjutan</em>.
                </p>
                <p>
                  Didukung oleh kemitraan erat dengan ekosistem bisnis <strong>Arlindo Group</strong> dan berbagai mitra industri multinasional,
                  proses perkuliahan di STIE ARLINDO dirancang memberikan pengalaman praktis nyata sejak semester awal, membekali mahasiswa dengan
                  kemampuan analisis bisnis mendalam serta kematangan etika kepemimpinan.
                </p>

                {/* 3 Value Pillars */}
                <div className={styles.pillarCards}>
                  {pillarsData.map((pillar, idx) => (
                    <div key={idx} className={styles.pillarCard}>
                      <div className={styles.pillarIcon}>{pillar.icon}</div>
                      <div>
                        <h4>{pillar.title}</h4>
                        <p>{pillar.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 2: VISI, MISI & NILAI-NILAI DASAR ===== */}
      <section className={`section ${styles.vmSection}`} id="visi-misi">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>

              <h2 className={styles.sectionTitle}>Visi, Misi &amp; Komitmen Keunggulan</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                Komitmen institusional STIE ARLINDO dalam menyelenggarakan pendidikan tinggi ekonomi berintegritas tinggi untuk merespons dinamika global.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.vmGrid}>
            {/* Visi Card */}
            <ScrollReveal delay={100}>
              <div className={styles.visiCard}>
                <div className={styles.visiWatermark}>VISI</div>
                <div>
                  <div className={styles.visiHeader}>
                    <div className={styles.visiIconCircle}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <h3>Visi Kampus</h3>
                  </div>

                  <div className={styles.visiQuote}>
                    &ldquo;Menjadi lembaga pendidikan tinggi manajemen dan ekonomi yang <span className={styles.visiHighlight}>unggul dan bermartabat</span> di Asia Tenggara (ASEAN) pada tahun 2030.&rdquo;
                  </div>
                </div>

                <div className={styles.visiMeta}>
                  <div className={styles.visiTargetBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>Target Capaian 2030</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>Berdaya Saing Global</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Misi Card */}
            <ScrollReveal delay={200}>
              <div className={styles.misiCard}>
                <div className={styles.misiHeader}>
                  <div className={styles.misiIconCircle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <h3>Misi Kampus</h3>
                </div>

                <div className={styles.misiItems}>
                  <div className={styles.misiItem}>
                    <div className={styles.misiNumber}>1</div>
                    <p>Menyelenggarakan pendidikan tinggi manajemen berkualitas unggul berbasis kurikulum kompetensi industri modern dan teknologi digital.</p>
                  </div>
                  <div className={styles.misiItem}>
                    <div className={styles.misiNumber}>2</div>
                    <p>Melaksanakan penelitian terapan dan pengabdian masyarakat yang solutif serta berkontribusi nyata pada penguatan perekonomian bangsa.</p>
                  </div>
                  <div className={styles.misiItem}>
                    <div className={styles.misiNumber}>3</div>
                    <p>Membangun kemitraan strategis dan kolaboratif dengan dunia usaha dan industri (DUDI), asosiasi profesi, serta universitas mitra.</p>
                  </div>
                  <div className={styles.misiItem}>
                    <div className={styles.misiNumber}>4</div>
                    <p>Membina sumber daya mahasiswa menjadi sarjana ekonomi yang berintegritas, beretika bisnis luhur, dan memiliki jiwa kepemimpinan mandiri.</p>
                  </div>
                  <div className={styles.misiItem}>
                    <div className={styles.misiNumber}>5</div>
                    <p>Mengoptimalkan tata kelola institusi yang transparan, akuntabel, dan berorientasi pada peningkatan penjaminan mutu berkelanjutan.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Core Values 4-Grid (Dibuat Lebih Presisi) */}
          <div className={styles.valuesSection}>
            <ScrollReveal>
              <div className="text-center" style={{ marginBottom: '2.5rem' }}>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--navy-900)' }}>Fondasi Karakter Sivitas Akademika</h3>
              </div>
            </ScrollReveal>

            <div className={styles.valuesGrid}>
              {coreValuesData.map((val, idx) => (
                <ScrollReveal key={idx} delay={idx * 80}>
                  <div className={styles.valueCard}>
                    <div className={styles.valueCardTop}>
                      <div className={styles.valueIcon}>{val.icon}</div>
                      <span className={styles.valueNumberBadge}>{val.number}</span>
                    </div>
                    <h4 className={styles.valueTitle}>{val.title}</h4>
                    <p className={styles.valueDesc}>{val.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: FASILITAS KAMPUS (HANYA GAMBAR & NAMA FASILITAS) ===== */}
      <section className={`section ${styles.facilitiesSection}`} id="fasilitas">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>

              <h2 className={styles.sectionTitle}>Fasilitas Kampus STIE ARLINDO</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                Dukung kenyamanan belajar, riset terapan, dan interaksi mahasiswa dengan ragam sarana kampus modern.
              </p>
            </div>
          </ScrollReveal>

          {/* Facilities Cards Grid (Visual: Gambar & Nama Saja) */}
          <div className={styles.facilitiesGridClean}>
            {facilities.map((facility, index) => (
              <ScrollReveal key={facility.id} delay={index * 50}>
                <div className={styles.facilityCardClean}>
                  <div className={styles.facilityImageWrapperClean}>
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      width={480}
                      height={320}
                      className={styles.facilityImgClean}
                    />
                    <div className={styles.facilityOverlayGrad} />
                  </div>
                  <div className={styles.facilityContentClean}>
                    <h3 className={styles.facilityNameClean}>{facility.name}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: KEPEMIMPINAN & TATA KELOLA KAMPUS ===== */}
      <section className={`section ${styles.leadershipSection}`} id="pimpinan">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>

              <h2 className={styles.sectionTitle}>Komitmen Pimpinan STIE ARLINDO</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                Diarahkan oleh akademisi dan praktisi berpengalaman untuk memastikan standar kualitas mutu tridharma perguruan tinggi berjalan berkesinambungan.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={styles.leaderCard}>
              <div className={styles.leaderImageCol}>
                <Image
                  src="/images/ketua-didik-setiyadi.jpg"
                  alt="Dr. Didik Setiyadi, S.E., M.M. - Ketua STIE ARLINDO"
                  width={400}
                  height={500}
                  className={styles.leaderImg}
                />
              </div>

              <div className={styles.leaderDetailsCol}>
                <span className={styles.leaderTag}>Ketua STIE ARLINDO</span>
                <h3 className={styles.leaderName}>Dr. Didik Setiyadi, S.E., M.M.</h3>
                <div className={styles.leaderPosition}>Pimpinan Perguruan Tinggi STIE ARLINDO</div>

                <div className={styles.leaderSpeech}>
                  <div className={styles.leaderQuoteIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  &ldquo;Di STIE ARLINDO, kami percaya bahwa pendidikan ekonomi masa kini tidak cukup hanya bertumpu pada teori textbook. Kami mempersiapkan mahasiswa dengan fondasi keilmuan mutakhir, penguasaan teknologi digital bisnis, serta kepekaan etika moral agar mampu tampil sebagai akselerator ekonomi yang tangguh di dunia kerja maupun kancah wirausaha mandiri.&rdquo;
                </div>

                <div className={styles.leaderPoints}>
                  <div className={styles.leaderPointItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Standar Mutu Akademik SPMI</span>
                  </div>
                  <div className={styles.leaderPointItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Kolaborasi Riset Praktisi Industri</span>
                  </div>
                  <div className={styles.leaderPointItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Akselerasi Karir Mahasiswa &amp; Magang</span>
                  </div>
                  <div className={styles.leaderPointItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Inkubasi Ekosistem Arlindo Group</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 5: LEGITIMASI & PENJAMINAN MUTU (PRESISI & RAPI) ===== */}
      <section className={styles.trustSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter} style={{ marginBottom: '2.5rem' }}>

              <h3 className={styles.sectionTitle} style={{ fontSize: '1.85rem' }}>Legalitas Resmi &amp; Pengakuan Negara</h3>
              <div className="gold-line" />
            </div>
          </ScrollReveal>

          <div className={styles.trustGrid}>
            {trustData.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 70}>
                <div className={styles.trustCard}>
                  <div className={styles.trustIconBox}>{item.icon}</div>
                  <h4 className={styles.trustTitle}>{item.title}</h4>
                  <p className={styles.trustSubtitle}>{item.subtitle}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      {/* (Section CTA telah dihapus sesuai permintaan) */}
    </>
  );
}
