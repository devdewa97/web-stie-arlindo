'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { submitContact, cleanWhatsAppNumber } from '@/lib/api';
import { useSettings } from '@/lib/useSettings';
import styles from './page.module.css';

/* ===== 4 KARTU INFORMASI UTAMA ===== */
function getContactHighlights(settings, waNumber) {
  return [
    {
      id: 'alamat',
      title: 'Alamat Kampus',
      subtitle: 'Gedung Rektorat & Perkuliahan',
      detail: settings?.address || 'Jl. Lurah Namat, RT.002/RW.003, Jatirangga, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17434',
      actionText: 'Lihat Peta Kampus',
      actionHref: '#lokasi-kampus',
      isExternal: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      id: 'telepon',
      title: 'Hotline & WhatsApp Admin',
      subtitle: 'Layanan Calon Mahasiswa',
      detail: `${settings?.whatsapp || '0812-9000-8899'} / ${settings?.phone || '(021) 845-8899'}\nKonsultasi pendaftaran & beasiswa setiap hari kerja`,
      actionText: 'Chat WhatsApp Resmi',
      actionHref: `https://wa.me/${waNumber}?text=Halo%20Admisi%20STIE%20ARLINDO,%20saya%20ingin%20konsultasi%20pendaftaran`,
      isExternal: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      id: 'email',
      title: 'Email Resmi',
      subtitle: 'Korespondensi & Administrasi',
      detail: `${settings?.email || 'info@arlindo.ac.id'}\nRespon surat & korespondensi dalam 1x24 jam kerja`,
      actionText: 'Kirim Email Resmi',
      actionHref: `mailto:${settings?.email || 'info@arlindo.ac.id'}`,
      isExternal: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      id: 'jam-kerja',
      title: 'Jam Layanan',
      subtitle: 'Waktu Operasional Kantor',
      detail: 'Senin – Jumat: 08.00 – 16.30 WIB\nSabtu: 08.30 – 13.00 WIB (Admisi PMB)',
      actionText: 'Jadwalkan Kunjungan',
      actionHref: '#formulir-kontak',
      isExternal: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];
}

/* ===== DIREKTORI LAYANAN DEPARTEMEN ===== */
function getDepartmentsData(settings, waNumber) {
  return [
    {
      name: 'Bagian Admisi & PMB',
      badge: 'Penerimaan Mahasiswa',
      desc: 'Layanan pendaftaran mahasiswa baru, informasi beasiswa prestasi & KIP Kuliah, biaya pendidikan, serta konsultasi program perkuliahan.',
      contact: settings?.whatsapp || '0812-9000-8899',
      email: settings?.email || 'admisi@arlindo.ac.id',
      actionUrl: `https://wa.me/${waNumber}?text=Halo%20Biro%20Admisi%20STIE%20ARLINDO`,
    },
    {
      name: 'Bagian Akademik & BAAK',
      badge: 'Layanan Mahasiswa Aktif',
      desc: 'Pengurusan KRS perkuliahan, transkrip nilai akademik sementara, surat aktif kuliah, legalisir dokumen, dan administrasi perkuliahan.',
      contact: `${settings?.phone || '(021) 845-8899'} Ext. 102`,
      email: 'akademik@arlindo.ac.id',
      actionUrl: 'mailto:akademik@arlindo.ac.id',
    },
    {
      name: 'Pusat Karir & Kerjasama',
      badge: 'Kemitraan & Alumni',
      desc: 'Program magang bersertifikasi Arlindo Group, lowongan kerja mitra industri, tracer study alumni, dan kerjasama institusi formal.',
      contact: `${settings?.phone || '(021) 845-8899'} Ext. 105`,
      email: 'kerjasama@arlindo.ac.id',
      actionUrl: 'mailto:kerjasama@arlindo.ac.id',
    },
  ];
}

/* ===== MEDIA SOSIAL RESMI ===== */
function getSocialChannels(settings, waNumber) {
  return [
    {
      name: 'Instagram Resmi',
      handle: '@stiearlindo',
      desc: 'Galeri kegiatan, seminar, info PMB & berita kampus terkini',
      href: settings?.instagram || 'https://instagram.com/stiearlindo',
      color: '#E1306C',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'YouTube Channel',
      handle: 'STIE ARLINDO Official',
      desc: 'Video profil kampus, liputan wisuda & rekaman kuliah umum',
      href: settings?.youtube || 'https://youtube.com/@stiearlindo',
      color: '#FF0000',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
    {
      name: 'Facebook Page',
      handle: 'STIE ARLINDO Bekasi',
      desc: 'Forum silaturahmi civitas akademika, alumni & masyarakat',
      href: settings?.facebook || 'https://facebook.com/stiearlindo',
      color: '#1877F2',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'Saluran WhatsApp',
      handle: 'Info Resmi Arlindo',
      desc: 'Broadcast pengumuman penting & info beasiswa berkala',
      href: `https://wa.me/${waNumber}`,
      color: '#25D366',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
  ];
}

/* ===== FAQ SINGKAT SEPUTAR KONTAK ===== */
const contactFaqs = [
  {
    q: 'Apakah calon mahasiswa dapat langsung berkunjung ke kampus untuk konsultasi pendaftaran?',
    a: 'Tentu saja. Anda sangat dipersilakan datang langsung ke Ruang Layanan Admisi & PMB di Kampus Terpadu STIE ARLINDO pada jam operasional (Senin – Jumat 08.00 – 16.30 WIB, dan Sabtu 08.30 – 13.00 WIB). Tim konselor kami siap memandu proses pendaftaran dan konsultasi pemilihan konsentrasi.',
  },
  {
    q: 'Berapa lama estimasi respon balasan dari formulir pesan website ini?',
    a: 'Setiap pesan yang dikirimkan melalui formulir resmi ini akan ditinjau dan dibalas oleh staf representatif kampus dalam waktu maksimal 1x24 jam kerja melalui email atau nomor WhatsApp yang Anda cantumkan.',
  },
  {
    q: 'Bagaimana cara menghubungi bagian administrasi bila berhalangan hadir langsung?',
    a: 'Anda dapat menghubungi hotline WhatsApp Admin di 0812-9000-8899, atau mengirimkan email resmi ke info@arlindo.ac.id. Kami juga melayani sesi konsultasi daring berbasis janji temu.',
  },
  {
    q: 'Bagaimana prosedur pengajuan kerjasama institusi, magang, atau rekrutmen kerja?',
    a: 'Instansi, korporasi, dan mitra industri dapat mengajukan permohonan kerjasama atau penawaran program magang dengan mengirimkan surat resmi (LoI/MoU) ke kerjasama@arlindo.ac.id atau menghubungi Biro Pusat Karir & Kerjasama Industri.',
  },
];

export default function KontakClient() {
  const { settings } = useSettings();
  const waNumber = cleanWhatsAppNumber(settings?.whatsapp || settings?.phone);
  const contactHighlights = getContactHighlights(settings, waNumber);
  const departmentsData = getDepartmentsData(settings, waNumber);
  const socialChannels = getSocialChannels(settings, waNumber);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Informasi Pendaftaran Mahasiswa Baru (PMB)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        subject: formData.subject,
        message: formData.message.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submit contact error:', err);
      setErrorMsg(err.message || 'Gagal mengirim pesan. Silakan periksa koneksi internet Anda atau coba sesaat lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Informasi Pendaftaran Mahasiswa Baru (PMB)',
      message: '',
    });
    setSubmitted(false);
    setErrorMsg('');
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? -1 : idx);
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
              <span className={styles.breadcrumbCurrent}>Hubungi Kami</span>
            </div>

            {/* Title */}
            <h1 className={styles.heroTitle}>
              Hubungi STIE ARLINDO: <br />
              <span className={styles.heroHighlight}>Pusat Informasi, Layanan &amp; Kemitraan</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Kami siap memberikan pendampingan informasi lengkap seputar penerimaan mahasiswa baru, perkuliahan S1 Manajemen terapan, kerjasama korporasi, hingga layanan administrasi akademik secara ramah dan profesional.
            </p>

            {/* Hero Actions */}
            <div className={styles.heroActions}>
              <a href="#formulir-kontak" className="btn btn-gold">
                <span>Kirim Pesan Sekarang</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${waNumber}?text=Halo%20Admisi%20STIE%20ARLINDO,%20saya%20ingin%20konsultasi%20pendaftaran`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp Admin</span>
              </a>
              <a href="#lokasi-kampus" className="btn btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Lokasi Kampus</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4 KARTU INFORMASI UTAMA ===== */}
      <section className={styles.highlightsSection}>
        <div className="container">
          <div className={styles.highlightsGrid}>
            {contactHighlights.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 80}>
                <div className={styles.highlightCard}>
                  <div className={styles.highlightHeader}>
                    <div className={styles.highlightIcon}>{item.icon}</div>
                    <span className={styles.highlightIndex}>0{idx + 1}</span>
                  </div>

                  <div className={styles.highlightBody}>
                    <h3 className={styles.highlightTitle}>{item.title}</h3>
                    <p className={styles.highlightSubtitle}>{item.subtitle}</p>
                    <p className={styles.highlightDetail}>{item.detail}</p>
                  </div>

                  <div className={styles.highlightAction}>
                    {item.isExternal ? (
                      <a href={item.actionHref} target="_blank" rel="noopener noreferrer" className={styles.highlightLink}>
                        <span>{item.actionText}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17l9.2-9.2M17 17V8H8" />
                        </svg>
                      </a>
                    ) : (
                      <a href={item.actionHref} className={styles.highlightLink}>
                        <span>{item.actionText}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN TWO-COLUMN SECTION: FORM & INTERACTIVE MAP ===== */}
      <section className={styles.mainContentSection} id="formulir-kontak">
        <div className="container">
          <div className={styles.splitGrid}>
            {/* LEFT: FORMULIR HUBUNGI KAMI */}
            <ScrollReveal>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <span className={styles.sectionBadge}>Formulir Resmi Korespondensi</span>
                  <h2 className={styles.formTitle}>Sampaikan Pesan &amp; Pertanyaan Anda</h2>
                  <p className={styles.formDesc}>
                    Silakan lengkapi formulir di bawah. Tim representatif STIE ARLINDO akan menindaklanjuti pesan Anda secara cepat dan seksama.
                  </p>
                </div>

                {submitted ? (
                  <div className={styles.successState}>
                    <div className={styles.successIconWrapper}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className={styles.successHeading}>Pesan Anda Berhasil Terkirim!</h3>
                    <p className={styles.successMessage}>
                      Terima kasih telah menghubungi STIE ARLINDO. Data Anda telah tercatat pada sistem kami. Tim kami akan segera merespons melalui email <strong>{formData.email}</strong> atau nomor WhatsApp yang Anda berikan.
                    </p>
                    <div className={styles.successActions}>
                      <button type="button" onClick={handleResetForm} className="btn btn-gold">
                        Kirim Pesan Lainnya
                      </button>
                      <a
                        href="https://wa.me/6281290008899"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                      >
                        Konfirmasi Cepat via WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.contactForm}>
                    {errorMsg && (
                      <div className={styles.errorAlert}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Nama Lengkap <span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Contoh: Muhammad Rizky Pratama"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Alamat Email Aktif <span className={styles.requiredStar}>*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className="form-input"
                          placeholder="nama@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          Nomor WhatsApp / Telepon
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          className="form-input"
                          placeholder="Contoh: 08123456789"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        Kategori Keperluan / Subjek <span className={styles.requiredStar}>*</span>
                      </label>
                      <div className={styles.selectWrapper}>
                        <select
                          id="subject"
                          name="subject"
                          className="form-input"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="Informasi Pendaftaran Mahasiswa Baru (PMB)">
                            Informasi Pendaftaran Mahasiswa Baru (PMB)
                          </option>
                          <option value="Konsultasi Beasiswa & Biaya Kuliah">
                            Konsultasi Beasiswa &amp; Biaya Kuliah
                          </option>
                          <option value="Informasi Perkuliahan Reguler / Karyawan">
                            Informasi Perkuliahan Reguler / Kelas Karyawan
                          </option>
                          <option value="Kemitraan Industri & Magang Arlindo Group">
                            Kemitraan Industri &amp; Magang Arlindo Group
                          </option>
                          <option value="Layanan BAAK & Administrasi Akademik">
                            Layanan BAAK &amp; Administrasi Akademik
                          </option>
                          <option value="Legalitas & Layanan Alumni">
                            Legalitas Ijazah &amp; Layanan Alumni
                          </option>
                          <option value="Lainnya / Pertanyaan Umum">
                            Lainnya / Pertanyaan Umum
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Isi Pesan atau Pertanyaan <span className={styles.requiredStar}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        placeholder="Tuliskan secara ringkas dan jelas informasi atau pertanyaan yang ingin Anda sampaikan..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                      />
                    </div>

                    <div className={styles.formActionBox}>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-gold ${styles.submitBtn}`}
                      >
                        {loading ? (
                          <>
                            <span className={styles.spinner} />
                            <span>Mengirimkan Pesan...</span>
                          </>
                        ) : (
                          <>
                            <span>Kirim Pesan Sekarang</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="22" y1="2" x2="11" y2="13" />
                              <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className={styles.privacyNote}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Privasi Anda terjamin. Data hanya digunakan untuk korespondensi resmi STIE ARLINDO.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* RIGHT: MAP & CAMPUS ACCESS GUIDE */}
            <ScrollReveal delay={150}>
              <div className={styles.locationWrapper} id="lokasi-kampus">
                <div className={styles.mapCard}>
                  {/* Header Info */}
                  <div className={styles.mapHeader}>
                    <span className={styles.sectionBadge}>Peta &amp; Akses Kampus</span>
                    <h3 className={styles.mapTitle}>Maps STIE ARLINDO</h3>

                    <div className={styles.mapAddressBox}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.mapPinIcon}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p className={styles.mapAddress}>
                        {settings?.address || 'Jl. Lurah Namat, RT.002/RW.003, Jatirangga, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17434'}
                      </p>
                    </div>
                  </div>

                  {/* Google Maps Iframe */}
                  <div className={styles.mapFrameContainer}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6732.551679795086!2d106.93311387683758!3d-6.370253793619937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6993431a2a976d%3A0xa805a3f4979a35a9!2sSTIE%20ARLINDO!5e1!3m2!1sid!2sid!4v1788762410060!5m2!1sid!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Peta Lokasi Kampus STIE ARLINDO"
                    />
                  </div>

                  {/* Campus Directions & Transit Highlights */}
                  <div className={styles.transitGuide}>
                    <div className={styles.transitHeaderRow}>
                      <h4 className={styles.transitTitle}>Aksesibilitas &amp; Petunjuk Rute:</h4>
                      <span className={styles.transitSubtitle}>Mudah dijangkau dengan kendaraan pribadi maupun transportasi umum</span>
                    </div>

                    <div className={styles.transitList}>
                      <div className={styles.transitCard}>
                        <div className={styles.transitIconBox}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="3" width="15" height="13" />
                            <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                          </svg>
                        </div>
                        <div className={styles.transitContent}>
                          <strong className={styles.transitLabel}>Akses Jalan Tol:</strong>
                          <p className={styles.transitDesc}>
                            10–15 menit dari Gerbang Tol Jatikarya (Tol Cimanggis–Cibitung) atau Exit Tol Cibubur.
                          </p>
                        </div>
                      </div>

                      <div className={styles.transitCard}>
                        <div className={styles.transitIconBox}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="3" width="16" height="16" rx="2" />
                            <path d="M4 11h16" />
                            <path d="M12 3v8" />
                            <path d="m8 19-2 3" />
                            <path d="m16 19 2 3" />
                          </svg>
                        </div>
                        <div className={styles.transitContent}>
                          <strong className={styles.transitLabel}>Transportasi Publik:</strong>
                          <p className={styles.transitDesc}>
                            Dekat stasiun LRT Harjamukti Cibubur, halte Transjakarta Cibubur Junction, dan angkutan Kranggan.
                          </p>
                        </div>
                      </div>

                      <div className={styles.transitCard}>
                        <div className={styles.transitIconBox}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 12 11 14 15 10" />
                          </svg>
                        </div>
                        <div className={styles.transitContent}>
                          <strong className={styles.transitLabel}>Fasilitas Kampus:</strong>
                          <p className={styles.transitDesc}>
                            Area parkir mobil/motor tertata aman, ruang kuliah ber-AC, perpustakaan, dan masjid kampus.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.mapButtonRow}>
                      <a
                        href="https://maps.app.goo.gl/E8MVxoSPdFWLw8Nm7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mapNavigateBtn}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                        <span>Buka Navigasi Rute di Google Maps</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnArrow}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION DIREKTORI LAYANAN DEPARTEMEN ===== */}
      <section className={styles.departmentsSection}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionBadge}>Layanan Spesifik Kampus</span>
            <h2 className={styles.sectionTitleCenter}>Direktori Layanan Departemen</h2>
            <div className="gold-line" />
            <p className={styles.sectionSubtitleCenter}>
              Hubungi langsung unit pelayanan terkait untuk konsultasi yang lebih cepat, spesifik, dan tepat sasaran.
            </p>
          </div>

          <div className={styles.departmentsGrid}>
            {departmentsData.map((dept, idx) => (
              <ScrollReveal key={dept.name} delay={idx * 100}>
                <div className={styles.departmentCard}>
                  <div className={styles.deptTop}>
                    <span className={styles.departmentBadge}>{dept.badge}</span>
                    <h3 className={styles.departmentName}>{dept.name}</h3>
                    <p className={styles.departmentDesc}>{dept.desc}</p>
                  </div>

                  <div className={styles.deptBottom}>
                    <div className={styles.departmentContacts}>
                      <div className={styles.deptContactRow}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>{dept.contact}</span>
                      </div>
                      <div className={styles.deptContactRow}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span>{dept.email}</span>
                      </div>
                    </div>

                    <a
                      href={dept.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.deptLink}
                    >
                      <span>Hubungi Unit Ini</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION SALURAN MEDIA SOSIAL RESMI ===== */}
      <section className={styles.socialsSection}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionBadge}>Komunitas &amp; Publikasi Digital</span>
            <h2 className={styles.sectionTitleCenter}>Terhubung di Media Sosial Resmi</h2>
            <div className="gold-line" />
            <p className={styles.sectionSubtitleCenter}>
              Dapatkan berita akademik terbaru, liputan kegiatan mahasiswa, siaran seminar nasional, dan pengumuman beasiswa langsung dari lini masa resmi kami.
            </p>
          </div>

          <div className={styles.socialsGrid}>
            {socialChannels.map((soc, idx) => (
              <ScrollReveal key={soc.name} delay={idx * 80}>
                <a
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCard}
                >
                  <div className={styles.socialCardTop}>
                    <div className={styles.socialIconBubble} style={{ color: soc.color }}>
                      {soc.icon}
                    </div>
                    <span className={styles.socialArrow}>↗</span>
                  </div>
                  <div className={styles.socialCardBody}>
                    <h4 className={styles.socialName}>{soc.name}</h4>
                    <div className={styles.socialHandle}>{soc.handle}</div>
                    <p className={styles.socialDesc}>{soc.desc}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION FAQ SEPUTAR KONTAK & KUNJUNGAN ===== */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionBadge}>Pertanyaan Umum</span>
            <h2 className={styles.sectionTitleCenter}>Kerap Ditanyakan Seputar Kontak Kampus</h2>
            <div className="gold-line" />
          </div>

          <div className={styles.faqWrapper}>
            {contactFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}
                >
                  <button
                    type="button"
                    className={styles.faqTrigger}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqQuestion}>{faq.q}</span>
                    <span className={styles.faqChevron}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className={styles.faqBody}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
