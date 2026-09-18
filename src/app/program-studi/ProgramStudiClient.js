'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { BACKEND_URL } from '@/lib/api';
import styles from './page.module.css';

/* ===== DATA PILAR KEUNGGULAN AKADEMIK ===== */
const pillarsData = [
  {
    title: 'Kurikulum Berbasis Kompetensi & MBKM',
    desc: 'Memadukan teori manajerial esensial dengan pemecahan studi kasus nyata, riset pasar terapan, dan magang industri terstruktur.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: 'Dosen Praktisi & Akademisi Berpengalaman',
    desc: 'Diajar oleh kombinasi akademisi bergelar doktor/magister serta para eksekutif praktisi yang aktif di sektor korporasi nasional.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Sinergi Ekosistem Usaha Arlindo Group',
    desc: 'Mahasiswa memiliki prioritas program magang bersertifikasi, akses data industri, serta percepatan penyerapan karir lulusan.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

/* ===== DATA 4 KONSENTRASI UNGGULAN ===== */
const concentrationsData = [
  {
    number: '01',
    title: 'Manajemen Keuangan & Inklusi Keuangan',
    desc: 'Keahlian analisis portofolio investasi terpadu, mitigasi risiko korporasi, perbankan modern, dan inovasi instrumen fintech.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    careers: [
      'Financial Analyst',
      'Investment Consultant',
      'Corporate Banker',
      'Fintech Specialist',
      'Risk Management Officer',
    ],
  },
  {
    number: '02',
    title: 'Manajemen Pemasaran Digital & E-Bisnis',
    desc: 'Keahlian strategi periklanan digital terapan, riset analitik perilaku konsumen, optimasi SEO/SEM, dan ekosistem e-commerce.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
    careers: [
      'Digital Marketing Lead',
      'Brand & Growth Strategist',
      'SEO/SEM Specialist',
      'E-Commerce Manager',
      'Content & Social Strategist',
    ],
  },
  {
    number: '03',
    title: 'Manajemen SDM & Manajemen Proyek',
    desc: 'Keahlian manajemen talenta insani strategis, kepemimpinan korporat adaptif, people analytics, dan kerangka kerja Agile.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    careers: [
      'HR Business Partner',
      'Agile Project Manager',
      'Talent Acquisition Lead',
      'People Operations Specialist',
      'Corporate HR Consultant',
    ],
  },
  {
    number: '04',
    title: 'Manajemen Operasional & Berkelanjutan',
    desc: 'Keahlian optimasi rantai pasok pintar (smart supply chain), efisiensi logistik, Lean Six Sigma, dan tata kelola ESG.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    careers: [
      'Supply Chain Analyst',
      'Operations Manager',
      'Sustainability/ESG Officer',
      'Logistics Coordinator',
      'Quality & Lean Specialist',
    ],
  },
];

/* ===== DATA KOMPETENSI LULUSAN ===== */
const outcomesData = [
  {
    title: 'Analisis Strategis Bisnis',
    desc: 'Mampu mengidentifikasi peluang pasar, memetakan risiko finansial, dan merumuskan keputusan manajerial berbasis data valid.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 14 14" />
      </svg>
    ),
  },
  {
    title: 'Kecakapan Digital & Teknologi',
    desc: 'Terampil memanfaatkan software analitik modern, tools pemasaran digital, fintech platform, serta sistem ERP industri.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Etika Profesi & Kepemimpinan',
    desc: 'Memiliki integritas moral tinggi, kecakapan komunikasi persuasif, etika bisnis luhur, dan tanggung jawab tata kelola berkelanjutan.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Daya Saing Karir & Wirausaha',
    desc: 'Siap menempati posisi manajerial di korporasi nasional, perbankan, BUMN, startup teknologi, atau merintis bisnis mandiri.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function ProgramStudiClient() {
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
              <span className={styles.breadcrumbCurrent}>Program Studi</span>
            </div>

            {/* Title */}
            <h1 className={styles.heroTitle}>
              Program Studi S1 Manajemen: <br />
              <span className={styles.heroHighlight}>Dirancang Relevan dengan Industri Masa Depan</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Mencetak sarjana manajemen yang kompeten, adaptif, dan beretika profesi tinggi melalui kurikulum terapan berbasis kompetensi, didukung 4 pilihan konsentrasi strategis dan sinergi ekosistem bisnis Arlindo Group.
            </p>

            {/* Quick Actions */}
            <div className={styles.heroActions}>
              <a href="#konsentrasi" className="btn btn-gold">
                <span>Lihat 4 Konsentrasi Unggulan</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
              <Link href="/pmb" className="btn btn-outline">
                Informasi Pendaftaran PMB
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1: PROFIL & KEUNGGULAN PRODI ===== */}
      <section className="section" id="profil-prodi">
        <div className="container">
          <ScrollReveal>
            <div className={styles.overviewGrid}>
              {/* Visual Left (Full Height Alignment) */}
              <div className={styles.overviewVisualCol}>
                <div className={styles.imageAccentBackdrop} />
                <div className={styles.imageFrame}>
                  <Image
                    src="/images/about-campus.jpg"
                    alt="Perkuliahan S1 Manajemen STIE ARLINDO"
                    width={640}
                    height={600}
                    className={styles.mainProdiImg}
                    priority
                  />
                  {/* Floating Badge */}
                  <div className={styles.floatingBadge}>
                    <div className={styles.floatingBadgeIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <div>
                      <div className={styles.floatingBadgeTitle}>Kurikulum MBKM Terapan</div>
                      <div className={styles.floatingBadgeSubtitle}>Integrasi DUDI &amp; Praktisi Korporat</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Right */}
              <div className={styles.overviewContent}>

                <h2 className={styles.sectionTitle}>
                  Mencetak Sarjana Manajemen Berdaya Saing Global &amp; Berintegritas
                </h2>
                <div className="gold-line-left" />
                <p>
                  Program Studi <strong>S1 Manajemen STIE ARLINDO</strong> dirancang responsif menjawab akselerasi dinamika industri 4.0. Melalui kurikulum berbasis kompetensi yang selaras dengan Kerangka Kualifikasi Nasional Indonesia (KKNI), mahasiswa dipersiapkan menguasai konsep manajerial, kecakapan analitik data bisnis, dan kepekaan kepemimpinan modern.
                </p>
                <p>
                  Didukung kemitraan terpadu bersama jaringan usaha <strong>Arlindo Group</strong> dan mitra industri terkemuka, mahasiswa mendapatkan pembelajaran aplikatif sejak semester awal, bimbingan dosen praktisi berpengalaman, serta kesempatan magang riil di unit-unit bisnis mitra.
                </p>

                {/* 3 Pillar Cards */}
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

      {/* ===== SECTION 2: 4 KONSENTRASI UNGGULAN (1 BARIS 4 CARD ULTRA-PRECISE) ===== */}
      <section className={`section ${styles.concSection}`} id="konsentrasi">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>

              <h2 className={styles.sectionTitle}>4 Konsentrasi Unggulan S1 Manajemen</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                Dirancang spesifik untuk membekali keahlian terapan masa kini dan membuka prospek karir korporat yang menjanjikan di era industri global.
              </p>
            </div>
          </ScrollReveal>

          {/* 1 Baris 4 Card Ultra-Precision Grid */}
          <div className={styles.concGridFour}>
            {concentrationsData.map((conc, idx) => (
              <ScrollReveal key={idx} delay={idx * 80}>
                <div className={styles.concCardFour}>
                  {/* Top content block with calibrated heights */}
                  <div className={styles.concCardTop}>
                    {/* Header: Icon & Concentration Number Badge */}
                    <div className={styles.concCardHeader}>
                      <div className={styles.concIconCircle}>{conc.icon}</div>
                      <div className={styles.concHeaderRight}>
                        <span className={styles.concNumLabel}>KONSENTRASI</span>
                        <span className={styles.concNumberBadge}>{conc.number}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={styles.concTitle}>{conc.title}</h3>

                    {/* Calibrated Description */}
                    <p className={styles.concDesc}>{conc.desc}</p>
                  </div>

                  {/* Laser-Aligned Hairline Divider */}
                  <div className={styles.concDivider} />

                  {/* Career Opportunities (Hanya Peluang Karir Sahaja) */}
                  <div className={styles.concCareerSection}>
                    <div className={styles.concCareerHeader}>
                      <div className={styles.concCareerHeaderLeft}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        <span>PELUANG KARIR LULUSAN</span>
                      </div>
                      <span className={styles.concCareerCount}>5 Jalur</span>
                    </div>

                    <div className={styles.careerTagsWrapper}>
                      {conc.careers.map((career, crIdx) => (
                        <div key={crIdx} className={styles.careerPill}>
                          <div className={styles.careerPillLeft}>
                            <span className={styles.careerNumIndex}>{crIdx + 1}</span>
                            <span className={styles.careerPillText}>{career}</span>
                          </div>
                          <svg className={styles.careerArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer Accent */}
                  <div className={styles.concCardFooter}>
                    <div className={styles.concBadgePill}>
                      <span className={styles.badgePulseDot} />
                      <span>Siap Kerja &amp; Karir Global</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: PROFIL KOMPETENSI LULUSAN ===== */}
      <section className={`section ${styles.outcomesSection}`} id="profil-lulusan">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>

              <h2 className={styles.sectionTitle}>Standar Kompetensi Sarjana STIE ARLINDO</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                Lulusan dibekali kecakapan komprehensif untuk siap beradaptasi dan memimpin di berbagai sektor korporasi maupun jalur entrepreneurship.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.outcomesGrid}>
            {outcomesData.map((outcome, idx) => (
              <ScrollReveal key={idx} delay={idx * 70}>
                <div className={styles.outcomeCard}>
                  <div className={styles.outcomeIconBox}>{outcome.icon}</div>
                  <h3 className={styles.outcomeTitle}>{outcome.title}</h3>
                  <p className={styles.outcomeDesc}>{outcome.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: CTA EXECUTIVE BANNER ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.ctaCard}>
              {/* Ambient Background Glows & Pattern */}
              <div className={styles.ctaGlowTop} />
              <div className={styles.ctaGlowBottom} />
              <div className={styles.ctaGridPattern} />

              <div className={styles.ctaInner}>
                {/* Status Indicator */}
                <div className={styles.ctaStatusBadge}>
                  <span className={styles.ctaStatusDot} />
                  <span>PENERIMAAN MAHASISWA BARU 2026/2027</span>
                </div>

                {/* Main Heading */}
                <h2 className={styles.ctaTitle}>
                  Siap Menjadi Pemimpin Bisnis{' '}
                  <span className={styles.ctaTitleGold}>Berdaya Saing Global?</span>
                </h2>

                {/* Subtitle */}
                <p className={styles.ctaDesc}>
                  Raih gelar Sarjana Manajemen (S.M.) di STIE ARLINDO dengan 4 konsentrasi terapan industri,
                  kurikulum berbasis studi kasus nyata, serta bimbingan langsung dari akademisi dan praktisi korporasi.
                </p>

                {/* Actions & Buttons */}
                <div className={styles.ctaActions}>
                  <Link href="/pmb" className={`btn btn-gold btn-lg ${styles.ctaBtnPrimary}`}>
                    <span>Daftar PMB Online</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>

                  <a
                    href={`${BACKEND_URL}/api/ebrochure/download`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-outline btn-lg ${styles.ctaBtnBrosur}`}
                    title="Unduh E-Brosur Resmi STIE ARLINDO"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Unduh E-Brosur</span>
                  </a>

                  <Link href="/kontak" className={`btn btn-outline btn-lg ${styles.ctaBtnOutline}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Konsultasi Program</span>
                  </Link>
                </div>

                {/* Reassurance Footer Note */}
                <div className={styles.ctaFootnote}>
                  <span className={styles.ctaFootnoteIcon}>✦</span>
                  <span>Proses pendaftaran mudah secara daring · Informasi biaya kuliah &amp; skema beasiswa tersedia</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
