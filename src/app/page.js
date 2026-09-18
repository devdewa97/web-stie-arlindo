'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { getAdmissionSchedules, getTestimonials, getGallery, getNewsSafe, formatImageUrl, cleanWhatsAppNumber, BACKEND_URL } from '@/lib/api';
import { useSettings } from '@/lib/useSettings';
import styles from './page.module.css';

function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
  }
  return url;
}

const defaultAdmissionSchedules = [
  { id: 1, name: 'Gelombang 1', status: 'past', status_label: 'Selesai', date_range: '1 Februari — 30 April 2026', benefit: null },
  { id: 2, name: 'Gelombang 2', status: 'active', status_label: 'Sedang Dibuka', date_range: '1 Mei — 31 Juli 2026', benefit: 'Benefit: Diskon Biaya Registrasi & Formulir' },
  { id: 3, name: 'Gelombang 3', status: 'upcoming', status_label: 'Segera', date_range: '1 Agustus — 30 September 2026', benefit: null },
];

/* ===== DATA ===== */
const features = [
  {
    num: '01',
    title: 'Pendidikan Berorientasi Masa Depan',
    desc: 'Kurikulum pembelajaran dirancang untuk membantu mahasiswa memahami ilmu manajemen dan menghadapi perkembangan dunia kerja serta bisnis.',
    icon: 'future',
  },
  {
    num: '02',
    title: 'Belajar dari Akademisi dan Praktisi',
    desc: 'Mahasiswa mendapatkan pembelajaran yang menggabungkan teori akademik dengan wawasan dan pengalaman dunia profesional.',
    icon: 'mentorship',
  },
  {
    num: '03',
    title: 'Lingkungan Belajar yang Mendukung',
    desc: 'STIE ARLINDO menyediakan lingkungan belajar yang mendorong mahasiswa untuk berkembang secara akademik, profesional, dan personal.',
    icon: 'environment',
  },
  {
    num: '04',
    title: 'Terhubung dengan Dunia Industri',
    desc: 'Mahasiswa memiliki kesempatan untuk mengenal dunia kerja dan membangun pengalaman yang relevan dengan kebutuhan industri.',
    icon: 'industry',
  },
];

const concentrations = [
  { title: 'Manajemen Keuangan', desc: 'Kuasai dunia keuangan modern, fintech, dan inklusi keuangan untuk masa depan yang cemerlang.' },
  { title: 'Manajemen Pemasaran', desc: 'Pelajari strategi pemasaran digital, SEO, social media marketing, dan e-commerce.' },
  { title: 'Manajemen SDM', desc: 'Kelola sumber daya manusia dan proyek dengan metodologi modern dan leadership skills.' },
  { title: 'Manajemen Operasional', desc: 'Optimalkan operasi bisnis dengan prinsip keberlanjutan dan efisiensi.' },
];

const testimonials = [
  {
    id: 1,
    name: 'Rina Sari, S.M.',
    role: 'Alumni 2024 — Digital Marketing Specialist, PT Telkom Indonesia',
    tag: 'Alumni S1 Manajemen',
    text: 'Kurikulum Manajemen Pemasaran Digital di STIE ARLINDO sangat aplikatif. Saya langsung menguasai strategi digital ads, optimasi SEO, dan data analytic yang membuka jalan akselerasi karir saya di industri telekomunikasi.',
  },
  {
    id: 2,
    name: 'Ahmad Fauzi, S.M.',
    role: 'Alumni 2023 — Financial Analyst, Bank Mandiri',
    tag: 'Alumni S1 Manajemen',
    text: 'Dosen-dosen praktisi di STIE ARLINDO memberikan wawasan industri perbankan yang nyata. Bimbingan karir serta ekosistem Arlindo Group sangat membantu proses transisi saya menuju dunia kerja profesional.',
  },
  {
    id: 3,
    name: 'Dewi Lestari',
    role: 'Mahasiswa Semester 6 — Konsentrasi Manajemen Keuangan',
    tag: 'Mahasiswa Aktif',
    text: 'Fasilitas kampus yang modern dan fleksibilitas jadwal perkuliahan membuat proses belajar sangat nyaman. Banyak program workshop praktisi bersertifikasi yang mengasah kesiapan karir sebelum lulus.',
  },
  {
    id: 4,
    name: 'Budi Pratama, S.M.',
    role: 'Alumni 2022 — Founder & CEO, Kopi Nusantara',
    tag: 'Entrepreneur Alumni',
    text: 'Mata kuliah kewirausahaan dan program inkubasi bisnis di STIE ARLINDO berhasil mengubah ide usaha saya menjadi bisnis riil yang kini memiliki jaringan outlet dan omzet puluhan juta rupiah per bulan.',
  },
  {
    id: 5,
    name: 'Siti Nurhaliza, S.M.',
    role: 'Alumni 2023 — HR Specialist, Astra International',
    tag: 'Alumni S1 Manajemen',
    text: 'Konsentrasi Manajemen SDM membekali saya pemahaman mendalam tentang people management, undang-undang ketenagakerjaan, dan talent development yang langsung relevan dengan industri korporasi.',
  },
  {
    id: 6,
    name: 'Kevin Sanjaya',
    role: 'Mahasiswa Semester 4 — Konsentrasi Manajemen Operasional',
    tag: 'Mahasiswa Aktif',
    text: 'Studi kasus operasional logistik dan supply chain management yang diajarkan sangat relevan dengan kebutuhan industri manufaktur modern saat ini, didukung dosen pembimbing yang sangat suportif.',
  },
];

const articles = [
  {
    id: 1,
    title: 'Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027 Resmi Dibuka',
    excerpt: 'STIE ARLINDO resmi membuka pendaftaran mahasiswa baru T.A. 2026/2027. Dapatkan beasiswa prestasi, kemudahan skema pembiayaan kuliah, serta jaminan akses magang dan karir di ekosistem bisnis Arlindo Group.',
    category: 'Pengumuman',
    date: '1 September 2026',
    slug: 'pendaftaran-mahasiswa-baru-2026-2027',
    image: '/images/news-pmb.jpg',
    isHighlight: true,
  },
  {
    id: 2,
    title: 'Workshop Manajemen Pemasaran Digital Bersama Praktisi Industri',
    excerpt: 'Pelatihan intensif strategi periklanan digital, optimasi SEO terapan, dan ekosistem e-commerce bersama praktisi industri. Mahasiswa dibekali studi kasus nyata dan praktik pengelolaan kampanye untuk kesiapan karir profesional di era transformasi digital.',
    category: 'Akademik',
    date: '28 Agustus 2026',
    slug: 'workshop-manajemen-pemasaran-digital',
    isHighlight: false,
  },
  {
    id: 3,
    title: 'Wisuda Angkatan ke-15 STIE ARLINDO Siap Hadapi Era Global',
    excerpt: 'Sebanyak 250 wisudawan program studi S1 Manajemen resmi dilantik dan siap berkontribusi di berbagai sektor korporasi maupun wirausaha nasional, berbekal kompetensi kepemimpinan unggul, etika bisnis, dan daya saing global.',
    category: 'Kegiatan',
    date: '20 Agustus 2026',
    slug: 'wisuda-angkatan-15',
    isHighlight: false,
  },
  {
    id: 4,
    title: 'STIE ARLINDO Jalin Kerjasama Strategis dengan 10 Mitra Korporasi',
    excerpt: 'Penandatanganan nota kesepahaman (MoU) kemitraan strategis mencakup program magang bersertifikat industri, riset kolaboratif, beasiswa prestasi korporasi, serta percepatan penyaluran karir lulusan di jaringan ekosistem bisnis mitra.',
    category: 'Kerjasama',
    date: '15 Agustus 2026',
    slug: 'kerjasama-perusahaan-mitra-baru',
    isHighlight: false,
  },
  {
    id: 5,
    title: 'Seminar Nasional: Peluang & Tantangan Ekonomi Berkelanjutan 2026',
    excerpt: 'Diskusi panel interaktif menghadirkan jajaran pakar ekonomi nasional dan pembuat kebijakan guna mengupas dinamika bisnis hijau, integrasi prinsip ESG, dan kesiapan tata kelola institusi dalam menghadapi tantangan ekonomi masa kini.',
    category: 'Seminar',
    date: '10 Agustus 2026',
    slug: 'seminar-nasional-ekonomi-bisnis-berkelanjutan',
    isHighlight: false,
  },
];

const galleryActivities = [
  {
    id: 1,
    title: 'Sidang Terbuka & Wisuda Sarjana Manajemen Angkatan XV',
    category: 'Wisuda & Prestasi',
    date: '20 Agustus 2026',
    desc: 'Pelantikan lulusan berdaya saing global dan berintegritas tinggi yang siap berkontribusi nyata di dunia industri korporasi dan wirausaha.',
    image: '/images/news-wisuda.jpg',
    isHighlight: true,
  },
  {
    id: 2,
    title: 'Workshop Strategi Pemasaran Digital & E-Commerce Terapan',
    category: 'Workshop Praktisi',
    date: '28 Agustus 2026',
    desc: 'Pelatihan intensif optimasi iklan digital bersama praktisi industri.',
    image: '/images/news-workshop.jpg',
    isHighlight: false,
  },
  {
    id: 3,
    title: 'Seminar Nasional: Peluang Integrasi Bisnis Hijau & ESG 2026',
    category: 'Seminar Nasional',
    date: '10 Agustus 2026',
    desc: 'Diskusi panel interaktif ekonomi berkelanjutan bersama pakar kebijakan.',
    image: '/images/news-seminar.jpg',
    isHighlight: false,
  },
  {
    id: 4,
    title: 'Penandatanganan MoU & Program Magang Bersertifikat Industri',
    category: 'Kolaborasi Industri',
    date: '15 Agustus 2026',
    desc: 'Kemitraan strategis penyerapan karir di ekosistem Arlindo Group.',
    image: '/images/news-kerjasama.jpg',
    isHighlight: false,
  },
  {
    id: 5,
    title: 'Suasana Pembelajaran & Diskusi Kolaboratif Mahasiswa Kampus',
    category: 'Kehidupan Kampus',
    date: '5 Agustus 2026',
    desc: 'Interaksi akademik di lingkungan kampus yang modern dan suportif.',
    image: '/images/about-campus.jpg',
    isHighlight: false,
  },
];

/* ===== COMPONENT ===== */
export default function HomePage() {
  const { settings } = useSettings();
  const waNumber = cleanWhatsAppNumber(settings?.whatsapp || settings?.phone);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState(null);

  // Dynamic CMS Data with Default Fallbacks
  const [admissionSchedules, setAdmissionSchedules] = useState(defaultAdmissionSchedules);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [activitiesList, setActivitiesList] = useState(galleryActivities);
  const [articlesList, setArticlesList] = useState(articles);

  const highlightArticle = articlesList.find((a) => a.isHighlight) || articlesList[0];
  const regularArticles = articlesList.filter((a) => a !== highlightArticle).slice(0, 4);
  const highlightActivity = activitiesList.find((item) => item.isHighlight) || activitiesList[0];
  const regularActivities = activitiesList.filter((item) => item !== highlightActivity).slice(0, 4);

  // Fetch CMS Data on Mount
  useEffect(() => {
    async function loadCmsData() {
      try {
        const [schedRes, testRes, galRes, newsRes] = await Promise.allSettled([
          getAdmissionSchedules(),
          getTestimonials(),
          getGallery(),
          getNewsSafe(1, 6),
        ]);

        if (schedRes.status === 'fulfilled' && schedRes.value?.data?.length > 0) {
          setAdmissionSchedules(schedRes.value.data);
        }

        if (testRes.status === 'fulfilled' && testRes.value?.data?.length > 0) {
          const mappedTestimonials = testRes.value.data.map((t) => ({
            id: t.id,
            name: t.name,
            role: t.role,
            tag: t.tag,
            text: t.content,
            avatar: formatImageUrl(t.avatar),
            rating: t.rating || 5,
          }));
          setTestimonialsList(mappedTestimonials);
        }

        if (galRes.status === 'fulfilled' && galRes.value?.data?.length > 0) {
          const mappedGal = galRes.value.data.map((g, idx) => ({
            id: g.id,
            title: g.title,
            category: g.category ? g.category.charAt(0).toUpperCase() + g.category.slice(1) : 'Kegiatan',
            eventName: g.event_name,
            date: g.created_at ? new Date(g.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '2026',
            desc: g.description,
            image: formatImageUrl(g.image || g.thumbnail || '/images/about-campus.jpg'),
            mediaType: g.media_type || 'image',
            videoUrl: g.video_url,
            isHighlight: idx === 0,
          }));
          setActivitiesList(mappedGal);
        }

        if (newsRes.status === 'fulfilled' && newsRes.value?.data?.length > 0) {
          const featuredIdx = newsRes.value.data.findIndex((item) => Boolean(item.is_featured));
          const targetHighlightIdx = featuredIdx !== -1 ? featuredIdx : 0;
          const mappedNews = newsRes.value.data.map((item, idx) => ({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt || (item.content ? item.content.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...' : ''),
            category: item.category_rel ? item.category_rel.name : (item.category ? item.category.toUpperCase() : 'Berita Kampus'),
            date: item.published_at
              ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
              : item.created_at
                ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                : '2026',
            slug: item.slug,
            image: formatImageUrl(item.image || '/images/news-pmb.jpg'),
            isHighlight: idx === targetHighlightIdx,
          }));
          setArticlesList(mappedNews);
        }
      } catch {
        // Silently fallback to static defaults
      }
    }

    loadCmsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, testimonialsList.length - visibleCount);

  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [maxSlide, currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [maxSlide]);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/images/hero-bg.png" alt="STIE ARLINDO Campus" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Mencetak Pemimpin Bisnis &amp; Manajemen <span className={styles.heroGold}>Berdaya Saing Global</span> Bersama STIE ARLINDO
            </h1>
            <p className={styles.heroDesc}>
              Kampus ekonomi dan bisnis yang menghadirkan pendidikan manajemen aplikatif, relevan dengan kebutuhan industri,
              serta membekali mahasiswa dengan kompetensi untuk menghadapi dunia kerja dan bisnis yang terus berkembang.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/kontak" className="btn btn-gold btn-lg">
                Konsultasi Sekarang
              </Link>
              <a
                href={`${BACKEND_URL}/api/ebrochure/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
                title="Unduh E-Brosur Resmi STIE ARLINDO"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Unduh E Brosur
              </a>
            </div>

            {/* Quick Access directly below buttons */}
            <div className={styles.heroQuickSection}>
              <span className={styles.heroQuickLabel}>Akses Cepat Layanan Kampus</span>
              <div className={styles.heroQuickGrid}>
                <a
                  href={settings.ejournal_url && settings.ejournal_url !== '#' ? settings.ejournal_url : '#'}
                  className={styles.heroQuickCard}
                  target={settings.ejournal_url && settings.ejournal_url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <div>
                    <h4>E-Journal</h4>
                    <p>Jurnal Ilmiah Online</p>
                  </div>
                  <span className={styles.heroQuickArrow}>→</span>
                </a>
                <a
                  href={settings.siakad_url && settings.siakad_url !== '#' ? settings.siakad_url : '#'}
                  className={styles.heroQuickCard}
                  target={settings.siakad_url && settings.siakad_url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <div>
                    <h4>Siakad</h4>
                    <p>Sistem Informasi Akademik</p>
                  </div>
                  <span className={styles.heroQuickArrow}>→</span>
                </a>
                <a
                  href={settings.portal_url && settings.portal_url !== '#' ? settings.portal_url : '#'}
                  className={styles.heroQuickCard}
                  target={settings.portal_url && settings.portal_url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <div>
                    <h4>Portal Mahasiswa</h4>
                    <p>Layanan Mahasiswa</p>
                  </div>
                  <span className={styles.heroQuickArrow}>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SAMBUTAN KETUA ===== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className={styles.welcomeGrid}>
              <div className={styles.welcomeImage}>
                <Image
                  src="/images/ketua-didik-setiyadi.jpg"
                  alt="Dr. Didik Setiyadi, S.E., M.M. - Ketua STIE ARLINDO"
                  width={460}
                  height={600}
                  className={styles.welcomeImg}
                  priority
                />
                <div className={styles.welcomeAccent} />
                <div className={styles.welcomeBadge}>
                  <h4>Dr. Didik Setiyadi, S.E., M.M.</h4>
                  <span>Ketua STIE ARLINDO</span>
                </div>
              </div>
              <div className={styles.welcomeText}>

                <h2>Sambutan Ketua STIE ARLINDO</h2>
                <div className="gold-line-left" />
                <p>
                  Selamat datang di STIE ARLINDO. Kami berkomitmen untuk mencetak lulusan yang kompeten,
                  berkarakter, dan siap bersaing di dunia kerja. Dengan dukungan ekosistem bisnis Arlindo Group,
                  mahasiswa kami mendapatkan pengalaman nyata di dunia industri sejak awal perkuliahan.
                </p>
                <p>
                  Kami percaya bahwa pendidikan yang berkualitas adalah kunci untuk membuka pintu
                  kesuksesan. Mari bergabung bersama kami untuk mewujudkan visi menjadi lembaga
                  pendidikan tinggi manajemen dan ekonomi yang unggul di ASEAN.
                </p>
                <div className={styles.welcomeSignBlock}>
                  <strong>Dr. Didik Setiyadi, S.E., M.M.</strong>
                  <span>Ketua STIE ARLINDO</span>
                </div>
                <Link href="/tentang-kami" className="btn btn-outline-navy">
                  Pelajari Selengkapnya →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== KEUNGGULAN (MENGAPA MEMILIH KAMI) ===== */}
      <section className="section-alt">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">

              <h2>Keunggulan STIE ARLINDO</h2>
              <div className="gold-line" />
              <p style={{ maxWidth: 640, margin: '1rem auto 0', color: 'var(--gray-600)', fontSize: '0.95rem' }}>
                Komitmen kami dalam menghadirkan pendidikan manajemen berkualitas yang mengintegrasikan kurikulum aplikatif, wawasan praktisi, dan kesiapan karir masa depan.
              </p>
            </div>
          </ScrollReveal>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 90}>
                <div className={styles.featureCard}>
                  <div className={styles.featureTopRow}>
                    <div className={styles.featureIconBox}>
                      {feature.icon === 'future' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                        </svg>
                      )}
                      {feature.icon === 'mentorship' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      )}
                      {feature.icon === 'environment' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      )}
                      {feature.icon === 'industry' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      )}
                    </div>
                    <span className={styles.featureNum}>{feature.num}</span>
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAM STUDI ===== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">

              <h2>S1 Manajemen — 4 Konsentrasi Pendidikan</h2>
              <div className="gold-line" />
              <p style={{ maxWidth: 600, margin: '1rem auto 0' }}>
                Pilih konsentrasi sesuai minat dan passion Anda untuk masa depan karir yang cerah.
              </p>
            </div>
          </ScrollReveal>
          <div className={styles.prodiGrid}>
            {concentrations.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className={styles.prodiCard}>
                  <div className={styles.prodiCardBody}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <Link href="/program-studi" className={styles.prodiBtn}>
                    <span>Selengkapnya</span>
                    <span>→</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARTIKEL / PENGUMUMAN ===== */}
      <section className="section-alt">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderBetween}>
              <div>

                <h2>Artikel &amp; Pengumuman</h2>
                <div className="gold-line-left" />
              </div>
              <Link href="/berita" className="btn btn-outline-navy">
                Lihat Semua Berita →
              </Link>
            </div>
          </ScrollReveal>

          <div className={styles.articleSectionGrid}>
            {/* Highlight Article (1) with Thumbnail */}
            {highlightArticle && (
              <ScrollReveal>
                <article className={styles.articleHighlightCard}>
                  <div className={styles.articleHighlightImageWrapper}>
                    <Image
                      src={highlightArticle.image}
                      alt={highlightArticle.title}
                      width={550}
                      height={280}
                      className={styles.articleHighlightImg}
                    />
                    <div className={styles.articleHighlightOverlayBadge}>
                      <span className={styles.articleHighlightTag}>Highlight</span>
                      <span className={styles.articleHighlightCategory}>{highlightArticle.category}</span>
                    </div>
                  </div>

                  <div className={styles.articleHighlightContent}>
                    <div>
                      <span className={styles.articleHighlightDate}>{highlightArticle.date}</span>
                      <h3 className={styles.articleHighlightTitle}>
                        <Link href={`/berita/${highlightArticle.slug}`}>
                          {highlightArticle.title}
                        </Link>
                      </h3>
                      <p className={styles.articleHighlightExcerpt}>
                        {highlightArticle.excerpt}
                      </p>
                    </div>

                    <div className={styles.articleHighlightFooter}>
                      <Link href={`/berita/${highlightArticle.slug}`} className={styles.articleHighlightBtn}>
                        <span>Baca Pengumuman</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            )}

            {/* Regular Articles (4) */}
            <div className={styles.articleRegularGrid}>
              {regularArticles.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 80}>
                  <article className={styles.articleRegularCard}>
                    <div>
                      <div className={styles.articleRegularHeader}>
                        <span className={styles.articleCategoryBadge}>{article.category}</span>
                        <span className={styles.articleDateText}>{article.date}</span>
                      </div>
                      <h4 className={styles.articleRegularTitle}>
                        <Link href={`/berita/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>
                      <p className={styles.articleRegularExcerpt}>
                        {article.excerpt}
                      </p>
                    </div>
                    <Link href={`/berita/${article.slug}`} className={styles.articleRegularLink}>
                      <span>Selengkapnya</span>
                      <span className={styles.articleLinkArrow}>→</span>
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PENDAFTARAN MAHASISWA BARU (PMB PREMIUM) ===== */}
      <section className={styles.pmbSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.pmbCard}>
              <div className={styles.pmbPattern} />

              <div className={styles.pmbGrid}>
                {/* Left Column: Heading & Value Proposition */}
                <div className={styles.pmbLeftCol}>
                  <h2 className={styles.pmbTitle}>
                    Wujudkan Masa Depan Karir Cemerlang Bersama <span className={styles.pmbTitleGold}>STIE ARLINDO</span>
                  </h2>

                  <p className={styles.pmbDesc}>
                    Daftarkan diri Anda pada Program S1 Manajemen dengan 4 konsentrasi terapan yang relevan dengan kebutuhan industri. Nikmati kemudahan skema pembiayaan, kesempatan beasiswa prestasi,
                    serta pembelajaran yang dirancang untuk mempersiapkan Anda menghadapi dunia profesional dan bisnis.
                  </p>

                  <div className={styles.pmbFeaturesList}>
                    <div className={styles.pmbFeatureItem}>
                      <div className={styles.pmbFeatureCheck}>✓</div>
                      <div>
                        <strong>Beasiswa Prestasi &amp; Keringanan Biaya</strong>
                        <p>Potongan biaya kuliah khusus bagi pendaftar gelombang awal dan siswa berprestasi.</p>
                      </div>
                    </div>

                    <div className={styles.pmbFeatureItem}>
                      <div className={styles.pmbFeatureCheck}>✓</div>
                      <div>
                        <strong>Akses Karir &amp; Magang Industri</strong>
                        <p>Peluang magang bersertifikat dan prioritas penyerapan kerja di Arlindo Group.</p>
                      </div>
                    </div>

                    <div className={styles.pmbFeatureItem}>
                      <div className={styles.pmbFeatureCheck}>✓</div>
                      <div>
                        <strong>Jadwal Kuliah Fleksibel</strong>
                        <p>Tersedia pilihan Kelas Reguler Pagi serta Kelas Karyawan Malam / Akhir Pekan.</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.pmbBtnGroup}>
                    <Link href="/pmb" className="btn btn-gold btn-lg">
                      Daftar Online Sekarang →
                    </Link>
                    <Link href="/kontak" className={`btn btn-lg ${styles.pmbBtnOutline}`}>
                      Konsultasi PMB
                    </Link>
                  </div>
                </div>

                {/* Right Column: Status Gelombang & Direct Info */}
                <div className={styles.pmbRightCol}>
                  <div className={styles.pmbWaveCard}>
                    <div className={styles.pmbWaveHeader}>
                      <span className={styles.pmbWaveLabel}>Jadwal Pendaftaran</span>
                      <h3>Gelombang Penerimaan</h3>
                    </div>

                    <div className={styles.pmbWaveTimeline}>
                      {admissionSchedules.map((wave) => {
                        const isPast = wave.status === 'past';
                        const isActive = wave.status === 'active';
                        const itemClass = isPast
                          ? `${styles.pmbWaveItem} ${styles.pmbWavePast}`
                          : isActive
                            ? `${styles.pmbWaveItem} ${styles.pmbWaveActive}`
                            : styles.pmbWaveItem;
                        const statusClass = isPast
                          ? styles.pmbStatusPast
                          : isActive
                            ? styles.pmbStatusActive
                            : styles.pmbStatusUpcoming;

                        return (
                          <div key={wave.id} className={itemClass}>
                            <div className={styles.pmbWaveContent}>
                              <div className={styles.pmbWaveTitleRow}>
                                <span className={styles.pmbWaveName}>{wave.name}</span>
                                <span className={statusClass}>
                                  {wave.status_label || (isActive ? 'Sedang Dibuka' : isPast ? 'Selesai' : 'Segera')}
                                </span>
                              </div>
                              <span className={styles.pmbWaveDate}>{wave.date_range}</span>
                              {wave.benefit && (
                                <span className={styles.pmbWavePerk}>{wave.benefit}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className={styles.pmbHelpBox}>
                      <div className={styles.pmbHelpText}>
                        <span className={styles.pmbHelpTitle}>Pusat Bantuan &amp; Konsultasi</span>
                        <span className={styles.pmbHelpDesc}>Tim Admin kami siap membantu proses pendaftaran Anda</span>
                      </div>
                      <a
                        href={`https://wa.me/${waNumber}?text=Halo%20Admin%20PMB%20STIE%20ARLINDO,%20saya%20ingin%20konsultasi%20pendaftaran`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.pmbHelpBtn}
                      >
                        Chat WhatsApp Admin →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION GALLERY / KEGIATAN KAMPUS ===== */}
      <section className={styles.gallerySection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.galleryHeader}>
              <div>

                <h2>Galeri Kegiatan Mahasiswa</h2>
                <div className="gold-line-left" />
              </div>
            </div>
          </ScrollReveal>

          <div className={styles.galleryGrid}>
            {/* Foto 1: Highlight Card (Besar di sisi kiri) */}
            {highlightActivity && (
              <ScrollReveal>
                <div
                  className={styles.galleryHighlightCard}
                  onClick={() => setActiveLightboxPhoto(highlightActivity)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveLightboxPhoto(highlightActivity)}
                  aria-label={`Lihat foto ${highlightActivity.title}`}
                >
                  <div className={styles.galleryHighlightImgWrap}>
                    <Image
                      src={highlightActivity.image}
                      alt={highlightActivity.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      style={{ objectFit: 'cover' }}
                      className={styles.galleryImg}
                    />
                    <div className={styles.galleryHighlightOverlay} />
                  </div>

                  <div className={styles.galleryHighlightBadgeRow}>
                    <span className={styles.galleryHighlightPill}>
                      {highlightActivity.mediaType === 'video' ? '▶ Video Kegiatan' : 'Highlight Kegiatan'}
                    </span>
                    <span className={styles.galleryCategoryPill}>{highlightActivity.category}</span>
                    {highlightActivity.eventName && (
                      <span className={styles.galleryCategoryPill} style={{ background: 'var(--gold-500)', color: 'var(--navy-900)', fontWeight: 700 }}>
                        {highlightActivity.eventName}
                      </span>
                    )}
                  </div>

                  {highlightActivity.mediaType === 'video' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)', zIndex: 3 }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gold-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy-900)', boxShadow: '0 4px 20px rgba(212,168,67,0.5)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4" /></svg>
                      </div>
                    </div>
                  )}

                  <div className={styles.galleryHighlightContent}>
                    <span className={styles.galleryDateText}>{highlightActivity.date}</span>
                    <h3 className={styles.galleryHighlightTitle}>{highlightActivity.title}</h3>
                    <p className={styles.galleryHighlightDesc}>{highlightActivity.desc}</p>
                    <div className={styles.galleryClickHint}>
                      <span>{highlightActivity.mediaType === 'video' ? 'Putar Video' : 'Perbesar Foto'}</span>
                      <span className={styles.galleryClickIcon}></span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Foto 2 - 5: 4 Foto Pendukung (Grid 2x2 di sisi kanan) */}
            <div className={styles.gallerySubGrid}>
              {regularActivities.map((item, idx) => (
                <ScrollReveal key={item.id} delay={(idx + 1) * 70}>
                  <div
                    className={styles.gallerySubCard}
                    onClick={() => setActiveLightboxPhoto(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveLightboxPhoto(item)}
                    aria-label={`Lihat foto ${item.title}`}
                  >
                    <div className={styles.gallerySubImgWrap}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        className={styles.galleryImg}
                      />
                      <div className={styles.gallerySubOverlay} />
                      {item.mediaType === 'video' && (
                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(239,68,68,0.9)', color: 'white', padding: '2px 7px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                          VIDEO
                        </div>
                      )}
                    </div>

                    <div className={styles.gallerySubContent}>
                      <div className={styles.gallerySubMeta}>
                        <span className={styles.gallerySubCategory}>{item.eventName || item.category}</span>
                        <span className={styles.gallerySubDate}>{item.date}</span>
                      </div>
                      <h4 className={styles.gallerySubTitle}>{item.title}</h4>
                      <div className={styles.gallerySubHoverAction}>
                        <span>{item.mediaType === 'video' ? 'Putar Video' : 'Klik untuk melihat'}</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Bottom CTA Action Button */}
          <ScrollReveal delay={200}>
            <div className={styles.galleryBottomAction}>
              <Link href="/gallery" className="btn btn-gold btn-lg">
                Lihat Kegiatan Lainnya →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox Modal Preview */}
      {activeLightboxPhoto && (
        <div
          className={styles.galleryLightbox}
          onClick={() => setActiveLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.galleryLightboxModal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.galleryLightboxClose}
              onClick={() => setActiveLightboxPhoto(null)}
              aria-label="Tutup pratinjau foto"
            >
              ✕
            </button>
            <div className={styles.galleryLightboxImgWrap} style={{ background: '#000', position: 'relative' }}>
              {activeLightboxPhoto.mediaType === 'video' ? (
                <div style={{ position: 'relative', width: '100%', minHeight: '360px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {activeLightboxPhoto.videoUrl && (activeLightboxPhoto.videoUrl.includes('youtube.com') || activeLightboxPhoto.videoUrl.includes('youtu.be')) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(activeLightboxPhoto.videoUrl)}
                      title={activeLightboxPhoto.title}
                      style={{ width: '100%', height: '360px', border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={activeLightboxPhoto.videoUrl}
                      controls
                      autoPlay
                      style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain' }}
                    />
                  )}
                </div>
              ) : (
                <Image
                  src={activeLightboxPhoto.image}
                  alt={activeLightboxPhoto.title}
                  fill
                  sizes="90vw"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              )}
            </div>
            <div className={styles.galleryLightboxDetails}>
              <div className={styles.galleryLightboxHeader}>
                <span className={styles.galleryCategoryPill}>{activeLightboxPhoto.category}</span>
                {activeLightboxPhoto.eventName && (
                  <span className={styles.galleryCategoryPill} style={{ background: 'var(--gold-500)', color: 'var(--navy-900)' }}>
                    {activeLightboxPhoto.eventName}
                  </span>
                )}
                <span className={styles.galleryLightboxDate}>{activeLightboxPhoto.date}</span>
              </div>
              <h3 className={styles.galleryLightboxTitle}>{activeLightboxPhoto.title}</h3>
              {activeLightboxPhoto.desc && (
                <p className={styles.galleryLightboxDesc}>{activeLightboxPhoto.desc}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== TESTIMONIALS (4 VISIBLE / 6 ITEMS SLIDER) ===== */}
      <section className="section-alt">
        <div className="container">
          <ScrollReveal>
            <div className={styles.testimonialHeader}>
              <div>

                <h2>Apa Kata Mereka</h2>
                <div className="gold-line-left" />
              </div>
              <div className={styles.testimonialNav}>
                <button
                  type="button"
                  onClick={prevSlide}
                  className={styles.testimonialNavBtn}
                  aria-label="Testimoni Sebelumnya"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className={styles.testimonialNavBtn}
                  aria-label="Testimoni Selanjutnya"
                >
                  →
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className={styles.testimonialSliderWrapper}>
              <div
                className={styles.testimonialTrack}
                style={{
                  transform: `translateX(calc(-${currentSlide} * ((100% - (${visibleCount} - 1) * 1.25rem) / ${visibleCount} + 1.25rem)))`,
                }}
              >
                {testimonialsList.map((item) => (
                  <div
                    key={item.id}
                    className={styles.testimonialSlideCard}
                    style={{
                      flex: `0 0 calc((100% - (${visibleCount} - 1) * 1.25rem) / ${visibleCount})`,
                    }}
                  >
                    <div>
                      <div className={styles.testimonialTopRow}>
                        <span className={styles.testimonialTag}>{item.tag}</span>
                        <span className={styles.testimonialRating}>
                          {'★'.repeat(item.rating || 5)}
                        </span>
                      </div>

                      <p className={styles.testimonialQuoteText}>
                        "{item.text}"
                      </p>
                    </div>

                    <div className={styles.testimonialProfile}>
                      {item.avatar ? (
                        <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            sizes="48px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div className={styles.testimonialAvatarInitials}>
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div className={styles.testimonialMeta}>
                        <h4 className={styles.testimonialName}>{item.name}</h4>
                        <p className={styles.testimonialRole}>{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className={styles.testimonialDots}>
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Lihat slide testimoni ${index + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
