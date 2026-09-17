'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { submitPMB, getAdmissionSchedules, cleanWhatsAppNumber, BACKEND_URL } from '@/lib/api';
import { useSettings } from '@/lib/useSettings';
import styles from './page.module.css';

/* ===== 3 JALUR PENDAFTARAN ===== */
const admissionTracks = [
  {
    badge: 'Jalur Reguler',
    title: 'Program S1 Reguler',
    desc: 'Jalur masuk umum bagi lulusan SMA/SMK/MA sederajat dengan fasilitas potongan dana pengembangan pendidikan (DPP) dan skema cicilan kuliah fleksibel.',
    benefits: [
      'Potongan Biaya Pengembangan hingga 20%',
      'Bebas biaya tes tertulis bagi nilai rata-rata rapor ≥ 75',
      'Skema angsuran SPP bulanan tanpa bunga',
      'Prioritas pemilihan jadwal kelas kuliah',
    ],
    highlight: false,
    ctaText: 'Daftar Jalur Reguler',
  },
  {
    badge: 'Program Beasiswa',
    title: 'Prestasi & KIP Kuliah',
    desc: 'Dukungan pembiayaan penuh atau parsial bagi calon mahasiswa berprestasi di bidang akademik, olahraga, seni, atau penerima KIP Kuliah.',
    benefits: [
      'Subsidi UKT hingga 100% sampai lulus',
      'Beasiswa Prestasi Akademik & Non-Akademik',
      'Menerima rekomendasi Beasiswa Arlindo Group',
      'Pembinaan kepemimpinan dan mentoring khusus',
    ],
    highlight: true,
    ctaText: 'Ajukan Jalur Beasiswa',
  },
  {
    badge: 'Jalur Fleksibel',
    title: 'Kelas Karyawan / Blended',
    desc: 'Dirancang khusus bagi pekerja, profesional muda, atau wirausahawan yang ingin melanjutkan pendidikan sarjana tanpa mengganggu rutinitas kerja.',
    benefits: [
      'Jadwal perkuliahan malam & akhir pekan',
      'Dukungan sistem e-learning interaktif modern',
      'Kurikulum terapan berbasis studi kasus riil',
      'Pengakuan sertifikasi profesi & pengalaman kerja',
    ],
    highlight: false,
    ctaText: 'Daftar Kelas Karyawan',
  },
];

/* ===== 4 LANGKAH ALUR PENDAFTARAN ===== */
const stepsData = [
  {
    num: '01',
    title: 'Registrasi Online',
    desc: 'Lengkapi biodata diri, riwayat pendidikan asal, dan tentukan jalur pendaftaran pada formulir online di bawah.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Verifikasi & Wawancara',
    desc: 'Tim admisi PMB memverifikasi kelengkapan berkas dan mengundang calon mahasiswa untuk sesi wawancara motivasi belajar.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Registrasi Ulang & SPP',
    desc: 'Penerbitan Surat Keputusan Penerimaan (LoA) serta pembayaran biaya registrasi awal secara fleksibel sesuai skema cicilan.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'NIM & Kuliah Perdana',
    desc: 'Penerbitan Nomor Induk Mahasiswa (NIM), penyerahan jas almamater, dan siap mengikuti masa orientasi kampus (PKKMB).',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

/* ===== PERSYARATAN BERKAS ===== */
const requirementsList = [
  'Scan / Fotokopi Ijazah atau Surat Keterangan Lulus (SKL) SMA/SMK/MA sederajat',
  'Scan / Fotokopi Rapor semester terakhir (bagi lulusan tahun berjalan)',
  'Scan / Fotokopi Kartu Tanda Penduduk (KTP) & Kartu Keluarga (KK)',
  'Pas foto formal berwarna terbaru ukuran 3x4 (latar belakang merah atau biru)',
  'Surat Keterangan Sehat dari dokter / fasilitas kesehatan',
  'Pengisian formulir pendaftaran online secara lengkap dan valid',
];

/* ===== PILIHAN JALUR PENDAFTARAN FORM ===== */
const admissionTrackOptions = [
  {
    value: 'Reguler',
    title: 'Jalur Reguler',
    badge: 'Gelombang 1',
    desc: 'Bagi lulusan SMA/SMK/MA sederajat. Potongan DPP awal & skema cicilan SPP bulanan terjangkau.',
  },
  {
    value: 'Beasiswa',
    title: 'Jalur Beasiswa',
    badge: 'Bantuan UKT',
    desc: 'Bagi siswa berprestasi akademik/non-akademik atau pemegang kartu KIP-Kuliah Kemendikbudristek.',
  },
  {
    value: 'Kelas Karyawan',
    title: 'Jalur Kelas Karyawan',
    badge: 'Waktu Fleksibel',
    desc: 'Bagi pekerja atau profesional dengan waktu kuliah malam atau akhir pekan didukung materi e-learning.',
  },
];

/* ===== PERTANYAAN UMUM (FAQ) ===== */
const faqsData = [
  {
    q: 'Kapan periode pendaftaran mahasiswa baru (PMB) dibuka?',
    a: 'Pendaftaran mahasiswa baru dibuka sepanjang tahun melalui 3 gelombang utama (Gelombang 1: Januari–April, Gelombang 2: Mei–Juli, Gelombang 3: Agustus–September). Pendaftar pada Gelombang 1 mendapatkan keuntungan potongan biaya pengembangan terbesar.',
  },
  {
    q: 'Apakah biaya kuliah di STIE ARLINDO dapat dicicil per bulan?',
    a: 'Ya, STIE ARLINDO menyediakan program cicilan biaya kuliah yang sangat fleksibel dan terjangkau setiap bulannya tanpa bunga, sehingga mahasiswa dan orang tua dapat merencanakan keuangan perkuliahan dengan tenang.',
  },
  {
    q: 'Bagaimana prosedur pendaftaran beasiswa KIP Kuliah di STIE ARLINDO?',
    a: 'Calon mahasiswa mendaftar secara online melalui portal KIP-Kuliah Kemendikbudristek dan memilih STIE ARLINDO sebagai perguruan tinggi tujuan, kemudian melengkapi berkas verifikasi pada sekretariat PMB STIE ARLINDO.',
  },
  {
    q: 'Apakah tersedia kelas malam / akhir pekan untuk yang sudah bekerja?',
    a: 'Tersedia. Kami menyelenggarakan Program Kelas Karyawan dengan waktu kuliah di malam hari (Senin–Jumat) atau sesi terpadu di akhir pekan (Sabtu), didukung materi kuliah digital yang dapat diakses kapan saja.',
  },
  {
    q: 'Apakah lulusan paket C atau SMK dapat mendaftar S1 Manajemen?',
    a: 'Tentu bisa. STIE ARLINDO menerima pendaftar dari seluruh jurusan SMA, SMK, Madrasah Aliyah (MA), maupun lulusan program kesetaraan Paket C resmi yang terakreditasi Kemendikbudristek.',
  },
  {
    q: 'Apakah mahasiswa mendapatkan jaminan kesempatan magang di Arlindo Group?',
    a: 'Ya, mahasiswa STIE ARLINDO memiliki akses prioritas magang industri terstruktur dan rekrutmen kerja pada berbagai unit bisnis di dalam ekosistem Arlindo Group dan mitra korporat rekanan.',
  },
];

export default function PMBClient() {
  const { settings } = useSettings();
  const waNumber = cleanWhatsAppNumber(settings?.whatsapp || settings?.phone || '0812-9000-8899');
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [schedules, setSchedules] = useState([
    { id: 1, name: 'Gelombang 1', status: 'past', status_label: 'Selesai', date_range: '1 Februari — 30 April 2026', benefit: null },
    { id: 2, name: 'Gelombang 2', status: 'past', status_label: 'Selesai', date_range: '1 Mei — 31 Juli 2026', benefit: 'Benefit: Diskon Biaya Registrasi & Formulir' },
    { id: 3, name: 'Gelombang 3', status: 'active', status_label: 'Sedang Dibuka', date_range: '1 Agustus — 30 September 2026', benefit: 'Pendaftaran Reguler Akhir' },
  ]);

  useEffect(() => {
    async function loadSchedules() {
      try {
        const res = await getAdmissionSchedules();
        if (res?.data?.length > 0) {
          setSchedules(res.data);
        }
      } catch {
        // graceful fallback
      }
    }
    loadSchedules();
  }, []);

  const [formData, setFormData] = useState({
    full_name: '',
    nik: '',
    email: '',
    phone: '',
    gender: '',
    birth_place: '',
    birth_date: '',
    religion: '',
    address: '',
    school_name: '',
    school_year: '',
    major: '',
    admission_track: 'Reguler',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      if (!formData.admission_track) {
        setErrorMessage('Silakan pilih salah satu jalur pendaftaran.');
        setLoading(false);
        return;
      }

      // Payload untuk backend API
      const payload = {
        full_name: formData.full_name,
        nik: formData.nik || null,
        birth_place: formData.birth_place || null,
        birth_date: formData.birth_date || null,
        gender: formData.gender ? formData.gender.toLowerCase() : null,
        religion: formData.religion || null,
        address: formData.address || null,
        phone: formData.phone,
        email: formData.email,
        school_name: formData.school_name || null,
        school_year: formData.school_year || null,
        major: formData.major || null,
        concentration: formData.admission_track, // Disimpan ke field concentration backend
      };

      await submitPMB(payload);
      setSubmittedData({ ...formData });
    } catch (error) {
      console.error('Submit PMB error:', error);
      setErrorMessage(error.message || 'Terjadi kesalahan saat mengirim formulir. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFormData({
      full_name: '',
      nik: '',
      email: '',
      phone: '',
      gender: '',
      birth_place: '',
      birth_date: '',
      religion: '',
      address: '',
      school_name: '',
      school_year: '',
      major: '',
      admission_track: 'Reguler',
    });
  };

  return (
    <>
      {/* ===== HERO SECTION (REDESIGN SEPERTI PROGRAM STUDI) ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGridPattern} />
        <div className="container">
          <div className={styles.heroContent}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
              <Link href="/">Beranda</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>Penerimaan Mahasiswa Baru</span>
            </div>

            {/* Title */}
            <h1 className={styles.heroTitle}>
              Penerimaan Mahasiswa Baru: <br />
              <span className={styles.heroHighlight}>Gerbang Karir Profesional &amp; Pemimpin Masa Depan</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Mulai perjalanan akademik Sarjana (S1) Manajemen Anda bersama STIE ARLINDO. Nikmati keunggulan kurikulum adaptif industri 4.0, prioritas magang bersertifikat di ekosistem Arlindo Group, dan skema pembiayaan kuliah yang terjangkau.
            </p>

            {/* Quick Actions */}
            <div className={styles.heroActions}>
              <a href="#form-daftar" className="btn btn-gold">
                <span>Daftar Online Sekarang</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={`${BACKEND_URL}/api/ebrochure/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                title="Unduh E-Brosur Resmi STIE ARLINDO"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Unduh E-Brosur</span>
              </a>
              <a href="#alur-dan-syarat" className="btn btn-outline">
                Alur &amp; Persyaratan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1: JALUR PENDAFTARAN & BENEFIT ===== */}
      <section className="section" id="jalur-masuk">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.tagLabel}>Pilihan Jalur Pendaftaran</span>
              <h2 className={styles.sectionTitle}>Pilih Jalur Masuk yang Sesuai dengan Anda</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                STIE ARLINDO menyediakan fleksibilitas jalur penerimaan untuk lulusan baru maupun kalangan profesional yang ingin melanjutkan studi sarjana.
              </p>
            </div>
          </ScrollReveal>

          {/* Status Gelombang Penerimaan (Dynamic from CMS) */}
          <div className={styles.wavesGrid}>
            {schedules.map((wave) => {
              const isActive = wave.status === 'active';
              const isPast = wave.status === 'past';
              const cardClass = `${styles.waveCard} ${isActive ? styles.waveCardActive : isPast ? styles.waveCardPast : ''}`;

              return (
                <div key={wave.id} className={cardClass}>
                  <div className={styles.waveHeader}>
                    <h3 className={styles.waveTitle}>{wave.name}</h3>
                    <span className={styles.waveBadge}>
                      {isActive && <span className={styles.wavePulseDot} />}
                      {wave.status_label || (isActive ? 'Sedang Dibuka' : isPast ? 'Selesai' : 'Segera')}
                    </span>
                  </div>

                  <div className={styles.waveDate}>
                    <svg className={styles.waveIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>{wave.date_range}</span>
                  </div>

                  {wave.benefit ? (
                    <div className={styles.waveBenefit}>
                      <svg className={styles.waveIcon} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>{wave.benefit}</span>
                    </div>
                  ) : (
                    <div style={{ height: '1.2rem' }} />
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.tracksGrid}>
            {admissionTracks.map((track, idx) => (
              <ScrollReveal key={idx} delay={idx * 80}>
                <div className={`${styles.trackCard} ${track.highlight ? styles.trackCardHighlight : ''}`}>
                  {track.highlight && (
                    <div className={styles.trackBestBadge}>Rekomendasi</div>
                  )}
                  <div className={styles.trackBadge}>{track.badge}</div>
                  <h3 className={styles.trackTitle}>{track.title}</h3>
                  <p className={styles.trackDesc}>{track.desc}</p>

                  <div className={styles.trackBenefitsList}>
                    <div className={styles.trackBenefitsTitle}>Benefit Utama:</div>
                    {track.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className={styles.trackBenefitItem}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#form-daftar" className={`btn ${track.highlight ? 'btn-gold' : 'btn-outline'} ${styles.trackCta}`}>
                    <span>{track.ctaText}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: ALUR PENDAFTARAN 4 LANGKAH ===== */}
      <section className={`section ${styles.stepsSection}`} id="alur-dan-syarat">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.tagLabel}>Tahapan Pendaftaran</span>
              <h2 className={styles.sectionTitle}>Alur Registrasi Calon Mahasiswa Baru</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                Proses pendaftaran cepat, transparan, dan dapat diselesaikan secara online dari mana saja.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.stepsGrid}>
            {stepsData.map((step, idx) => (
              <ScrollReveal key={step.num} delay={idx * 70}>
                <div className={styles.stepCard}>
                  <div className={styles.stepCardTop}>
                    <span className={styles.stepNumBadge}>{step.num}</span>
                    <div className={styles.stepIconBox}>{step.icon}</div>
                  </div>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: PERSYARATAN & LAYANAN KONSULTASI ===== */}
      <section className="section">
        <div className="container">
          <div className={styles.reqSplitGrid}>
            {/* Persyaratan Dokumen */}
            <ScrollReveal>
              <div className={styles.reqCardWrapper}>
                <span className={styles.tagLabel}>Kelengkapan Berkas</span>
                <h3 className={styles.subSectionTitle}>Dokumen Persyaratan Administrasi</h3>
                <div className="gold-line-left" />
                <p className={styles.subSectionDesc}>
                  Siapkan dokumen berikut dalam format fisik atau digital (scan) untuk kelancaran verifikasi identitas:
                </p>

                <div className={styles.reqListContainer}>
                  {requirementsList.map((req, rIdx) => (
                    <div key={rIdx} className={styles.reqItemRow}>
                      <div className={styles.reqCheckBadge}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.reqNoticeBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-600)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>
                    <strong>Catatan:</strong> Ijazah atau SKL dapat disusulkan bagi siswa kelas 12 yang belum menerima pengumuman kelulusan resmi.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pusat Bantuan Admisi (Hotline Resmi Admisi) */}
            <ScrollReveal delay={150}>
              <div className={styles.helpCenterCard}>
                <div className={styles.helpCenterGlow} />
                <span className={styles.helpCenterTag}>Hotline Resmi Admisi</span>
                <h3 className={styles.helpCenterTitle}>Butuh Bantuan atau Konsultasi Kuliah?</h3>
                <p className={styles.helpCenterDesc}>
                  Tim Penerimaan Mahasiswa Baru STIE ARLINDO siap membantu menjawab pertanyaan Anda seputar biaya kuliah, beasiswa, dan panduan pendaftaran.
                </p>

                <div className={styles.helpItemsList}>
                  <div className={styles.helpItem}>
                    <div className={styles.helpItemIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div className={styles.helpItemLabel}>WhatsApp Konsultasi:</div>
                      <a href="https://wa.me/6281280000000" target="_blank" rel="noopener noreferrer" className={styles.helpItemValue}>
                        +62 812-8000-xxxx (Chat Langsung)
                      </a>
                    </div>
                  </div>

                  <div className={styles.helpItem}>
                    <div className={styles.helpItemIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <div className={styles.helpItemLabel}>Email Admisi:</div>
                      <a href={`mailto:${settings?.email || 'pmb@arlindo.ac.id'}`} className={styles.helpItemValue}>
                        {settings?.email || 'pmb@arlindo.ac.id'}
                      </a>
                    </div>
                  </div>

                  <div className={styles.helpItem}>
                    <div className={styles.helpItemIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <div className={styles.helpItemLabel}>Jam Layanan Kantor:</div>
                      <span className={styles.helpItemValue}>Senin – Sabtu, 08:00 – 16:00 WIB</span>
                    </div>
                  </div>

                  <div className={styles.helpItem}>
                    <div className={styles.helpItemIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className={styles.helpItemLabel}>Lokasi Kampus:</div>
                      <span className={styles.helpItemValue}>
                        {settings?.address || 'Jl. Lurah Namat, Jatirangga, Kec. Jatisampurna, Kota Bekasi'}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${waNumber}?text=Halo%20Admin%20PMB%20STIE%20ARLINDO,%20saya%20ingin%20berkonsultasi%20mengenai%20pendaftaran%20kuliah.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1.75rem' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Chat WhatsApp Admisi PMB</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: FORMULIR PENDAFTARAN ONLINE (PREMIUM REDESIGN) ===== */}
      <section className={`section ${styles.formSectionWrapper}`} id="form-daftar">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.tagLabel}>Registrasi Calon Mahasiswa</span>
              <h2 className={styles.sectionTitle}>Formulir Pendaftaran Online S1 Manajemen</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                {settings.pmb_period ? `Penerimaan Mahasiswa Baru Periode T.A. ${settings.pmb_period}. ` : ''}
                Isi formulir pendaftaran di bawah ini dengan data yang benar. Tim admisi kami akan segera memproses dan menghubungi Anda.
              </p>
            </div>
          </ScrollReveal>

          {submittedData ? (
            /* ===== TAMPILAN PENDAFTARAN SUKSES ===== */
            <ScrollReveal>
              <div className={styles.successCardBox}>
                <div className={styles.successIconCircle}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h3 className={styles.successTitle}>Pendaftaran Anda Berhasil Diterima!</h3>
                <p className={styles.successMessage}>
                  Terima kasih, <strong>{submittedData.full_name}</strong>! Data registrasi Anda telah tersimpan secara resmi pada basis data sistem Penerimaan Mahasiswa Baru STIE ARLINDO.
                </p>

                <div className={styles.successSummaryBox}>
                  <div className={styles.successSummaryItem}>
                    <span>Nama Calon Mahasiswa:</span>
                    <strong>{submittedData.full_name}</strong>
                  </div>
                  <div className={styles.successSummaryItem}>
                    <span>Nomor WhatsApp:</span>
                    <strong>{submittedData.phone}</strong>
                  </div>
                  <div className={styles.successSummaryItem}>
                    <span>Email Terdaftar:</span>
                    <strong>{submittedData.email}</strong>
                  </div>
                  <div className={styles.successSummaryItem}>
                    <span>Jalur Pendaftaran:</span>
                    <strong style={{ color: 'var(--gold-600)' }}>Jalur {submittedData.admission_track}</strong>
                  </div>
                </div>

                <p className={styles.successNextNote}>
                  Tim Admisi PMB kami akan menghubungi Anda melalui WhatsApp/Email dalam 1x24 jam kerja untuk tahapan verifikasi berkas dan jadwal konsultasi akademik.
                </p>

                <div className={styles.successActions}>
                  <a
                    href={`https://wa.me/6281280000000?text=Halo%20Admin%20PMB%20STIE%20ARLINDO,%20saya%20sudah%20mendaftar%20online%20atas%20nama%20${encodeURIComponent(
                      submittedData.full_name
                    )}%20(Jalur%20${encodeURIComponent(submittedData.admission_track)}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                  >
                    <span>Konfirmasi via WhatsApp</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <button onClick={resetForm} className="btn btn-outline">
                    Daftarkan Calon Lain
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            /* ===== FORMULIR ELEGAN & MODERN ===== */
            <ScrollReveal delay={120}>
              <div className={styles.formContainerCard}>
                {errorMessage && (
                  <div className={styles.formAlertError}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.registrationForm}>
                  {/* BAGIAN 1: IDENTITAS CALON MAHASISWA */}
                  <div className={styles.formBlock}>
                    <div className={styles.formBlockHeader}>
                      <span className={styles.formBlockNum}>1</span>
                      <div>
                        <h4 className={styles.formBlockTitle}>Identitas Pribadi Calon Mahasiswa</h4>
                        <p className={styles.formBlockDesc}>Masukkan identitas diri sesuai dokumen KTP atau Kartu Keluarga</p>
                      </div>
                    </div>

                    <div className={styles.formFieldsGrid}>
                      <div className={styles.fieldColFull}>
                        <label className={styles.fieldLabel}>
                          Nama Lengkap Calon Mahasiswa <span className={styles.requiredStar}>*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Masukkan nama lengkap sesuai ijazah"
                          className={styles.modernInput}
                          required
                        />
                      </div>

                      <div>
                        <label className={styles.fieldLabel}>Nomor WhatsApp Aktif <span className={styles.requiredStar}>*</span></label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="contoh: 081234567890"
                          className={styles.modernInput}
                          required
                        />
                      </div>

                      <div>
                        <label className={styles.fieldLabel}>Alamat Email Aktif <span className={styles.requiredStar}>*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="contoh: email@anda.com"
                          className={styles.modernInput}
                          required
                        />
                      </div>

                      <div>
                        <label className={styles.fieldLabel}>NIK / No. KTP (Opsional)</label>
                        <input
                          type="text"
                          name="nik"
                          value={formData.nik}
                          onChange={handleChange}
                          placeholder="16 digit NIK KTP"
                          className={styles.modernInput}
                          maxLength={20}
                        />
                      </div>

                      <div>
                        <label className={styles.fieldLabel}>Jenis Kelamin</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={styles.modernSelect}
                        >
                          <option value="">Pilih Jenis Kelamin</option>
                          <option value="laki-laki">Laki-laki</option>
                          <option value="perempuan">Perempuan</option>
                        </select>
                      </div>

                      <div>
                        <label className={styles.fieldLabel}>Tempat Lahir</label>
                        <input
                          type="text"
                          name="birth_place"
                          value={formData.birth_place}
                          onChange={handleChange}
                          placeholder="Kota kelahiran"
                          className={styles.modernInput}
                        />
                      </div>

                      <div>
                        <label className={styles.fieldLabel}>Tanggal Lahir</label>
                        <input
                          type="date"
                          name="birth_date"
                          value={formData.birth_date}
                          onChange={handleChange}
                          className={styles.modernInput}
                        />
                      </div>

                      <div className={styles.fieldColFull}>
                        <label className={styles.fieldLabel}>Alamat Lengkap Domisili</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Nama jalan, nomor rumah, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                          className={styles.modernTextarea}
                        />
                      </div>
                    </div>
                  </div>

                  {/* BAGIAN 2: DATA PENDIDIKAN ASAL */}
                  <div className={styles.formBlock}>
                    <div className={styles.formBlockHeader}>
                      <span className={styles.formBlockNum}>2</span>
                      <div>
                        <h4 className={styles.formBlockTitle}>Riwayat Pendidikan Terakhir</h4>
                        <p className={styles.formBlockDesc}>Informasi sekolah asal SMA / SMK / MA / sederajat</p>
                      </div>
                    </div>

                    <div className={styles.formFieldsGrid}>
                      <div className={styles.fieldColFull}>
                        <label className={styles.fieldLabel}>Nama Sekolah Asal</label>
                        <input
                          type="text"
                          name="school_name"
                          value={formData.school_name}
                          onChange={handleChange}
                          placeholder="contoh: SMAN 1 Bekasi / SMKN 2 Jakarta"
                          className={styles.modernInput}
                        />
                      </div>

                      <div>
                        <label className={styles.fieldLabel}>Jurusan Sekolah Asal</label>
                        <input
                          type="text"
                          name="major"
                          value={formData.major}
                          onChange={handleChange}
                          placeholder="contoh: IPA / IPS / Akuntansi / TKJ"
                          className={styles.modernInput}
                        />
                      </div>

                      <div>
                        <label className={styles.fieldLabel}>Tahun Kelulusan</label>
                        <input
                          type="text"
                          name="school_year"
                          value={formData.school_year}
                          onChange={handleChange}
                          placeholder="contoh: 2026 atau 2025"
                          className={styles.modernInput}
                        />
                      </div>
                    </div>
                  </div>

                  {/* BAGIAN 3: PEMILIHAN JALUR PENDAFTARAN */}
                  <div className={styles.formBlock}>
                    <div className={styles.formBlockHeader}>
                      <span className={styles.formBlockNum}>3</span>
                      <div>
                        <h4 className={styles.formBlockTitle}>Pilihan Jalur Pendaftaran</h4>
                        <p className={styles.formBlockDesc}>Pilih salah satu jalur penerimaan mahasiswa baru yang ingin Anda ikuti</p>
                      </div>
                    </div>

                    <div className={styles.trackRadioGrid}>
                      {admissionTrackOptions.map((opt) => (
                        <label
                          key={opt.value}
                          className={`${styles.trackRadioCard} ${formData.admission_track === opt.value ? styles.trackRadioCardActive : ''
                            }`}
                        >
                          <input
                            type="radio"
                            name="admission_track"
                            value={opt.value}
                            checked={formData.admission_track === opt.value}
                            onChange={handleChange}
                            className={styles.hiddenRadio}
                          />
                          <div className={styles.radioDotCircle}>
                            <div className={styles.radioDotInner} />
                          </div>
                          <div className={styles.trackRadioContent}>
                            <div className={styles.trackRadioHeader}>
                              <span className={styles.trackRadioTitle}>{opt.title}</span>
                              <span className={styles.trackRadioBadge}>{opt.badge}</span>
                            </div>
                            <p className={styles.trackRadioDesc}>{opt.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* SUBMIT BUTTON & PRIVACY NOTE */}
                  <div className={styles.formSubmitWrapper}>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`btn btn-gold btn-lg ${styles.submitButton}`}
                    >
                      {loading ? (
                        <>
                          <span className={styles.buttonSpinner} />
                          <span>Mengirim Formulir...</span>
                        </>
                      ) : (
                        <>
                          <span>Kirim Formulir Pendaftaran</span>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className={styles.privacyNote}>
                      🔒 Data pendaftaran Anda dilindungi kerahasiaannya dan hanya digunakan untuk keperluan verifikasi admisi STIE ARLINDO.
                    </p>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ===== SECTION 5: FAQ (PERTANYAAN UMUM) ===== */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.tagLabel}>Tanya Jawab Seputar PMB</span>
              <h2 className={styles.sectionTitle}>Pertanyaan yang Sering Diajukan</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                Temukan jawaban lengkap seputar prosedur masuk, skema beasiswa, perkuliahan, dan pembiayaan kuliah di STIE ARLINDO.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.faqListWrapper}>
            {faqsData.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 60}>
                <div className={`${styles.faqCard} ${openFaq === index ? styles.faqCardOpen : ''}`}>
                  <button
                    className={styles.faqHeaderBtn}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span className={styles.faqQuestionText}>{faq.q}</span>
                    <div className={styles.faqToggleIconBox}>
                      <span className={styles.faqToggleSign}>{openFaq === index ? '−' : '+'}</span>
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className={styles.faqBody}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
