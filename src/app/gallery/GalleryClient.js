'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { getGallery, formatImageUrl } from '@/lib/api';
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

export default function GalleryClient() {
  const [items, setItems] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApiGallery() {
      try {
        const json = await getGallery();
        if (json?.data && json.data.length > 0) {
          const apiItems = json.data.map((item) => ({
            id: `api-${item.id}`,
            title: item.title,
            event_name: item.event_name,
            category: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Umum',
            media_type: item.media_type || 'image',
            image: formatImageUrl(item.image_url || item.thumbnail || '/images/about-campus.jpg'),
            video_url: item.video_url,
            description: item.description || '',
            color: '#162D5A',
          }));
          setItems(apiItems);
        }
      } catch {
        // API offline — gallery tetap kosong
      } finally {
        setLoading(false);
      }
    }
    fetchApiGallery();
  }, []);

  return (
    <>
      {/* ===== HERO SECTION (REDESIGNED SEPERTI PROGRAM STUDI) ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGridPattern} />
        <div className="container">
          <div className={styles.heroContent}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
              <Link href="/">Beranda</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>Galeri Kampus</span>
            </div>

            {/* Title */}
            <h1 className={styles.heroTitle}>
              Dokumentasi &amp; Galeri Kampus: <br />
              <span className={styles.heroHighlight}>Momen Bersejarah &amp; Dinamika Civitas</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Eksplorasi visual ragam aktivitas akademik, kebersamaan mahasiswa, fasilitas perkuliahan modern, serta momen wisuda dan seremonial penting di lingkungan STIE ARLINDO.
            </p>

            {/* Quick Actions */}
            <div className={styles.heroActions}>
              <a href="#koleksi-galeri" className="btn btn-gold">
                <span>Eksplorasi Foto Kegiatan</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
              <Link href="/program-studi" className="btn btn-outline">
                Lihat Program Studi S1
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION KOLEKSI GALERI ===== */}
      <section className="section" id="koleksi-galeri">
        <div className="container">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>


              <h2 className={styles.sectionTitle}>Arsip Kegiatan STIE ARLINDO</h2>
              <div className="gold-line" />
              <p className={styles.sectionSubtitle}>
                Dokumentasi visual kegiatan akademik, kemahasiswaan, dan seremonial kampus STIE ARLINDO.
              </p>
            </div>
          </ScrollReveal>

          {/* Gallery Grid */}
          <div className={styles.grid}>
            {items.map((item, index) => (
              <ScrollReveal key={item.id} delay={(index % 4) * 60}>
                <div
                  className={styles.galleryItem}
                  onClick={() => setLightbox(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightbox(item)}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={styles.galleryImg}
                    />
                  ) : (
                    <div className={styles.galleryPlaceholder} style={{ backgroundColor: item.color }} />
                  )}

                  {item.media_type === 'video' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)', zIndex: 2 }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gold-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy-900)', boxShadow: '0 4px 16px rgba(212,168,67,0.4)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                      </div>
                    </div>
                  )}

                  <div className={styles.galleryOverlay}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
                      {item.media_type === 'video' && (
                        <span style={{ background: 'rgba(239,68,68,0.9)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          ▶ VIDEO
                        </span>
                      )}
                    </div>
                    {item.event_name && (
                      <div style={{ fontSize: '11px', color: 'var(--gold-400)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                        📌 {item.event_name}
                      </div>
                    )}
                    <h4 className={styles.galleryTitle}>{item.title}</h4>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {items.length === 0 && !loading && (
            <div className={styles.empty}>
              <p>Belum ada dokumentasi. Upload foto atau video melalui halaman admin.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== LIGHTBOX MODAL ===== */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.lightboxClose}
              onClick={() => setLightbox(null)}
              aria-label="Tutup Pratinjau Foto"
            >
              ✕
            </button>
            <div className={styles.lightboxMediaWrapper} style={{ background: '#000' }}>
              {lightbox.media_type === 'video' ? (
                <div style={{ position: 'relative', width: '100%', minHeight: '380px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {lightbox.video_url && (lightbox.video_url.includes('youtube.com') || lightbox.video_url.includes('youtu.be')) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(lightbox.video_url)}
                      title={lightbox.title}
                      style={{ width: '100%', height: '380px', border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={lightbox.video_url}
                      controls
                      autoPlay
                      style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain' }}
                    />
                  )}
                </div>
              ) : lightbox.image ? (
                <Image
                  src={lightbox.image}
                  alt={lightbox.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 820px"
                  className={styles.lightboxImg}
                />
              ) : (
                <div className={styles.lightboxImage} style={{ backgroundColor: lightbox.color }} />
              )}
            </div>
            <div className={styles.lightboxInfo}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                {lightbox.media_type === 'video' && (
                  <span style={{ background: '#EF4444', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    VIDEO KEGIATAN
                  </span>
                )}
                {lightbox.event_name && (
                  <span style={{ background: 'var(--gold-500)', color: 'var(--navy-900)', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    📌 {lightbox.event_name}
                  </span>
                )}
              </div>
              <h3 className={styles.lightboxTitle}>{lightbox.title}</h3>
              {lightbox.description && <p className={styles.lightboxDesc}>{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
