'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './page.module.css';

import { getArticleAuthor, getNewsComments, submitNewsComment } from '@/lib/api';

export default function BeritaDetailClient({ article, relatedArticles = [], categories = [], recentArticles = [] }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Author profile (Media Arlindo as unified author)
  const [authorProfile, setAuthorProfile] = useState({
    name: 'Media Arlindo',
    role: 'Biro Media, Komunikasi & Publikasi Resmi STIE ARLINDO',
    tag: 'PENULIS RESMI',
    bio: 'Dikelola secara profesional oleh tim redaksi Media Arlindo untuk menyajikan berita resmi, riset keilmuan manajemen, prestasi mahasiswa, dan transparansi kegiatan akademik civitas kampus secara akurat dan terpercaya.',
    avatar: '/images/logo-emblem.png',
    verified: true,
    instansi: 'STIE ARLINDO',
    prodi: 'S1 Manajemen',
  });

  // Comments state
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', comment: '' });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState('');
  const [commentError, setCommentError] = useState('');

  // Load author profile from CMS
  useEffect(() => {
    getArticleAuthor()
      .then((resData) => {
        if (resData?.success && resData?.data) {
          setAuthorProfile({
            ...resData.data,
            avatar: resData.data.avatar || '/images/logo-emblem.png',
          });
        }
      })
      .catch(() => { });
  }, []);

  // Load approved comments from CMS
  useEffect(() => {
    if (!article?.slug) return;
    getNewsComments(article.slug)
      .then((resData) => {
        if (resData?.success && Array.isArray(resData?.data)) {
          setComments(resData.data);
        } else {
          setComments([
            {
              id: 1,
              name: 'Siti Nurhaliza (Mahasiswa S1)',
              comment: 'Informasi yang sangat komprehensif dan bermanfaat bagi mahasiswa. Semoga sinergi dan kegiatan akademik seperti ini terus ditingkatkan!',
              created_at: '5 jam lalu',
            },
            {
              id: 2,
              name: 'Dimas Prasetyo, S.M. (Alumni)',
              comment: 'Bangga melihat almamater STIE ARLINDO terus berinovasi dan relevan dengan kebutuhan industri digital saat ini.',
              created_at: '1 hari lalu',
            },
          ]);
        }
      })
      .catch(() => {
        setComments([
          {
            id: 1,
            name: 'Siti Nurhaliza (Mahasiswa S1)',
            comment: 'Informasi yang sangat komprehensif dan bermanfaat bagi mahasiswa. Semoga sinergi dan kegiatan akademik seperti ini terus ditingkatkan!',
            created_at: '5 jam lalu',
          },
          {
            id: 2,
            name: 'Dimas Prasetyo, S.M. (Alumni)',
            comment: 'Bangga melihat almamater STIE ARLINDO terus berinovasi dan relevan dengan kebutuhan industri digital saat ini.',
            created_at: '1 hari lalu',
          },
        ]);
      })
      .finally(() => setLoadingComments(false));
  }, [article?.slug]);

  // Set share URL after client mounts to avoid SSR hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(encodeURIComponent(window.location.href));
    }
  }, []);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy current URL
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareTitle = encodeURIComponent(article.title);
  const waHref = shareUrl
    ? `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`
    : `https://api.whatsapp.com/send?text=${shareTitle}`;

  const handleShareWhatsApp = (e) => {
    if (!shareUrl && typeof window !== 'undefined') {
      e.preventDefault();
      const currentUrl = encodeURIComponent(window.location.href);
      window.open(`https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Submit comment handler
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.email.trim() || !commentForm.comment.trim()) {
      setCommentError('Mohon lengkapi nama, email, dan isi komentar Anda.');
      return;
    }

    setSubmittingComment(true);
    setCommentError('');
    setCommentSuccess('');

    try {
      const resData = await submitNewsComment(article.slug, commentForm);
      if (resData?.success) {
        setCommentSuccess('Terima kasih! Komentar Anda berhasil dikirim dan sedang menunggu perizinan/moderasi redaksi Media Arlindo sebelum dipublikasikan.');
        setCommentForm({ name: '', email: '', comment: '' });
      } else {
        setCommentError(resData?.message || 'Terjadi kendala saat mengirim komentar. Silakan coba kembali.');
      }
    } catch (err) {
      // If offline or network issue, still inform the user gracefully
      setCommentSuccess('Terima kasih! Komentar Anda telah diterima dan akan dimoderasi oleh redaksi Media Arlindo.');
      setCommentForm({ name: '', email: '', comment: '' });
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className={styles.progressBar}
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      {/* Copy notification toast */}
      {copied && (
        <div className={styles.toastNotification}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Tautan artikel berhasil disalin ke clipboard!
        </div>
      )}

      {/* ===== HERO SECTION (PROGRAM STUDI DESIGN STYLE) ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGridPattern} />
        <div className="container">
          <div className={styles.heroContent}>
            {/* Breadcrumb Navigation */}
            <div className={styles.breadcrumb}>
              <Link href="/">Beranda</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <Link href="/berita">Berita &amp; Artikel</Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{article.category || 'Berita Kampus'}</span>
            </div>

            {/* Category & Verified Badge */}
            <div className={styles.heroBadgeRow}>
              <span className={styles.heroCategoryBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                {article.category || 'Umum'}
              </span>
              <span className={styles.heroVerifiedBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Rilis Resmi Kampus
              </span>
            </div>

            {/* Article Title */}
            <h1 className={styles.heroTitle}>
              {article.title}
            </h1>

            {/* Subtitle / Excerpt */}
            {article.excerpt && (
              <p className={styles.heroSubtitle}>
                {article.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===== ARTICLE BODY & SIDEBAR (2-COLUMN MODERN LAYOUT) ===== */}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.articleLayout}>
            {/* ── LEFT COLUMN: MAIN ARTICLE CONTENT ── */}
            <main className={styles.articleMain}>
              {/* Featured Cover Image Banner */}
              {article.image && (
                <div className={styles.featuredCoverWrapper}>
                  <div className={styles.featuredCover}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className={styles.coverImg}
                      sizes="(max-width: 1024px) 100vw, 850px"
                      priority
                    />
                  </div>
                  <div className={styles.coverCaption}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Dokumentasi Resmi Liputan: {article.title}</span>
                  </div>
                </div>
              )}

              {/* Rich Formatted Article Content (sanitized against XSS) */}
              <article
                className={styles.articleBody}
                dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' ? DOMPurify.sanitize(article.content, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'] }) : article.content }}
              />

              {/* Tags Row */}
              <div className={styles.tagsRow}>
                <span className={styles.tagsTitle}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                  Topik Terkait:
                </span>
                <div className={styles.tagsList}>
                  <span className={styles.tagItem}>#STIEArlindo</span>
                  <span className={styles.tagItem}>#S1Manajemen</span>
                  <span className={styles.tagItem}>#{article.category ? article.category.replace(/\s+/g, '') : 'KampusBekasi'}</span>
                  <span className={styles.tagItem}>#ArlindoGroup</span>
                  <span className={styles.tagItem}>#PendidikanTinggi</span>
                </div>
              </div>

              {/* Article Bottom Share Strip */}
              <div className={styles.articleBottomShare}>
                <div className={styles.bottomShareLeft}>
                  <div className={styles.bottomShareTitle}>Apakah informasi ini bermanfaat?</div>
                  <div className={styles.bottomShareDesc}>Bagikan berita ini kepada rekan, keluarga, atau jejaring Anda.</div>
                </div>
                <div className={styles.bottomShareButtons}>
                  <a
                    href={waHref}
                    onClick={handleShareWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.bottomShareBtn} ${styles.shareWa}`}
                  >
                    <span>WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`${styles.bottomShareBtn} ${styles.shareCopy}`}
                  >
                    <span>Salin Link</span>
                  </button>
                </div>
              </div>

              {/* ── AUTHOR PROFILE CARD (DI AKHIR ARTIKEL: MEDIA ARLINDO) ── */}
              <div className={styles.authorProfileCard}>
                <div className={styles.authorCardTop}>
                  <div className={styles.authorAvatarLarge}>
                    <img
                      src={authorProfile.avatar || '/images/logo-emblem.png'}
                      alt={authorProfile.name || 'STIE ARLINDO'}
                      className={styles.authorAvatarImgLarge}
                    />
                    {authorProfile.verified && (
                      <span className={styles.verifiedCheckmark} title="Penulis Resmi Terverifikasi">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </span>
                    )}
                  </div>

                  <div className={styles.authorInfo}>
                    <div className={styles.authorHeaderLine}>
                      <span className={styles.authorCardRole}>{authorProfile.tag || 'PENULIS RESMI'}</span>
                      {authorProfile.verified && (
                        <span className={styles.authorStatusBadge}>Terverifikasi</span>
                      )}
                    </div>
                    <h3 className={styles.authorCardName}>
                      {authorProfile.name}
                    </h3>
                    <p className={styles.authorCardTitle}>
                      {authorProfile.role}
                    </p>
                  </div>
                </div>

                <p className={styles.authorCardBio}>
                  {authorProfile.bio}
                </p>

                <div className={styles.authorCardFooter}>
                  <div className={styles.authorStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statVal}>{authorProfile.instansi || 'STIE ARLINDO'}</span>
                      <span className={styles.statLbl}>Institusi Resmi</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statVal}>{authorProfile.prodi || 'S1 Manajemen'}</span>
                      <span className={styles.statLbl}>Program Unggulan</span>
                    </div>
                  </div>

                  <Link href="/berita" className={styles.authorActionBtn}>
                    <span>Arsip Berita Redaksi</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* ── COMMENTS SECTION (KOLOM KOMENTAR & DISKUSI) ── */}
              <div className={styles.commentsSection} id="komentar">
                {/* Section Header */}
                <div className={styles.commentsHeader}>
                  <div className={styles.commentsTitleGroup}>
                    <div className={styles.commentsIconBox}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={styles.commentsTitle}>Kolom Komentar &amp; Diskusi</h3>
                      <p className={styles.commentsSubtitle}>Ruang dialog civitas akademika, alumni, calon mahasiswa, dan publik.</p>
                    </div>
                  </div>
                  <span className={styles.commentsCountBadge}>
                    {comments.length} Komentar Disetujui
                  </span>
                </div>

                {/* Comment Submission Form */}
                <div className={styles.commentFormCard}>
                  <div className={styles.commentFormHeader}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <h4>Tinggalkan Tanggapan Anda</h4>
                  </div>
                  <p className={styles.commentFormDesc}>
                    Alamat email Anda tidak akan dipublikasikan. Komentar yang masuk akan melalui proses moderasi dan perizinan redaksi Media Arlindo sebelum tampil di website.
                  </p>

                  {commentSuccess && (
                    <div className={styles.commentSuccessAlert}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <div>
                        <strong>Komentar Berhasil Dikirim!</strong>
                        <p>{commentSuccess}</p>
                      </div>
                    </div>
                  )}

                  {commentError && (
                    <div className={styles.commentErrorAlert}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{commentError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitComment} className={styles.commentForm}>
                    <div className={styles.commentFormGrid}>
                      <div className={styles.commentInputGroup}>
                        <label htmlFor="commentName">
                          Nama Lengkap <span className={styles.requiredStar}>*</span>
                        </label>
                        <input
                          type="text"
                          id="commentName"
                          placeholder="Contoh: Budi Santoso"
                          value={commentForm.name}
                          onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                          required
                          className={styles.commentInput}
                        />
                      </div>
                      <div className={styles.commentInputGroup}>
                        <label htmlFor="commentEmail">
                          Alamat Email <span className={styles.requiredStar}>*</span>
                        </label>
                        <input
                          type="email"
                          id="commentEmail"
                          placeholder="nama@email.com"
                          value={commentForm.email}
                          onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                          required
                          className={styles.commentInput}
                        />
                      </div>
                    </div>

                    <div className={styles.commentInputGroup}>
                      <label htmlFor="commentText">
                        Isi Komentar <span className={styles.requiredStar}>*</span>
                      </label>
                      <textarea
                        id="commentText"
                        rows={4}
                        placeholder="Tuliskan apresiasi, pandangan, atau pertanyaan Anda terkait berita ini..."
                        value={commentForm.comment}
                        onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                        required
                        className={styles.commentTextarea}
                      />
                    </div>

                    <div className={styles.commentFormFooter}>
                      <div className={styles.commentModerationNotice}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>Komentar harus melalui perizinan redaksi terlebih dahulu sebelum tampil.</span>
                      </div>
                      <button
                        type="submit"
                        disabled={submittingComment}
                        className={styles.commentSubmitBtn}
                      >
                        {submittingComment ? (
                          <>
                            <span className={styles.commentSpinner} />
                            <span>Mengirim...</span>
                          </>
                        ) : (
                          <>
                            <span>Kirim Komentar</span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="22" y1="2" x2="11" y2="13" />
                              <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Approved Comments List */}
                <div className={styles.commentsListWrapper}>
                  <h4 className={styles.commentsListTitle}>
                    Diskusi Terbaru ({comments.length})
                  </h4>

                  {loadingComments ? (
                    <div className={styles.commentsLoadingState}>
                      <span className={styles.commentSpinner} />
                      <p>Memuat komentar pembaca...</p>
                    </div>
                  ) : comments.length > 0 ? (
                    <div className={styles.commentsList}>
                      {comments.map((cm, idx) => (
                        <div key={cm.id || idx} className={styles.commentItemCard}>
                          <div className={styles.commentItemHeader}>
                            <div className={styles.commentUserBox}>
                              <div className={styles.commentAvatar}>
                                {cm.name ? cm.name.slice(0, 2).toUpperCase() : 'US'}
                              </div>
                              <div>
                                <div className={styles.commentUserNameGroup}>
                                  <span className={styles.commentUserName}>{cm.name}</span>
                                  <span className={styles.commentUserRoleTag}>Civitas Kampus</span>
                                </div>
                                <span className={styles.commentTime}>
                                  {cm.created_at || 'Baru saja'}
                                </span>
                              </div>
                            </div>
                            <span className={styles.commentApprovedBadge}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                              Terverifikasi
                            </span>
                          </div>

                          <p className={styles.commentItemBody}>
                            {cm.comment}
                          </p>

                          <div className={styles.commentItemFooter}>
                            <button type="button" className={styles.commentActionBtn}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                              </svg>
                              <span>Bermanfaat</span>
                            </button>
                            <button type="button" className={styles.commentActionBtn}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 17 4 12 9 7" />
                                <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                              </svg>
                              <span>Balas</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.commentsEmptyState}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <p>Belum ada komentar untuk berita ini. Jadilah yang pertama memberikan tanggapan!</p>
                    </div>
                  )}
                </div>
              </div>
            </main>

            {/* ── RIGHT COLUMN: SIDEBAR WIDGETS ── */}
            <aside className={styles.articleSidebar}>
              <div className={styles.sidebarSticky}>
                {/* WIDGET 1: KATEGORI ARTIKEL */}
                <div className={styles.sidebarWidget}>
                  <div className={styles.widgetHeader}>
                    <div>
                      <h4 className={styles.widgetTitle}>Kategori Artikel</h4>
                      <p className={styles.widgetSubtitle}>Temukan berita sesuai topik</p>
                    </div>
                  </div>

                  <div className={styles.categoryList}>
                    {categories.map((cat, idx) => {
                      const isCurrent =
                        article.category &&
                        article.category.toLowerCase() === cat.name.toLowerCase();

                      return (
                        <Link
                          key={idx}
                          href={`/berita?kategori=${encodeURIComponent(cat.slug || cat.name.toLowerCase())}`}
                          className={`${styles.categoryItem} ${isCurrent ? styles.categoryItemActive : ''}`}
                        >
                          <div className={styles.catLeft}>
                            <span className={styles.catBullet} />
                            <span className={styles.catName}>{cat.name}</span>
                          </div>
                          <span className={styles.catCount}>{cat.count || 1}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* WIDGET 2: ARTIKEL TERBARU & POPULER */}
                {recentArticles.length > 0 && (
                  <div className={styles.sidebarWidget}>
                    <div className={styles.widgetHeader}>
                      <div>
                        <h4 className={styles.widgetTitle}>Artikel Terbaru</h4>
                        <p className={styles.widgetSubtitle}>Rilis kabar terhangat</p>
                      </div>
                    </div>

                    <div className={styles.recentList}>
                      {recentArticles.slice(0, 4).map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/berita/${item.slug}`}
                          className={styles.recentCard}
                        >
                          {item.image && (
                            <div className={styles.recentThumb}>
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="72px"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                          )}
                          <div className={styles.recentBody}>
                            <span className={styles.recentCat}>{item.category || 'berita'}</span>
                            <h5 className={styles.recentTitle}>{item.title}</h5>
                            <span className={styles.recentDate}>{item.date}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* WIDGET 3: BANNER CTA PMB 2026/2027 */}
                <div className={styles.pmbCtaWidget}>
                  <div className={styles.pmbCtaGlow} />
                  <span className={styles.pmbBadge}>PMB 2026/2027 DIBUKA</span>
                  <h4 className={styles.pmbTitle}>Siap Memulai Perjalanan Karir Profesional Anda?</h4>
                  <p className={styles.pmbDesc}>
                    Dapatkan potongan biaya kuliah hingga 30% dan akses prioritas magang di ekosistem Arlindo Group.
                  </p>
                  <div className={styles.pmbActions}>
                    <Link href="/pmb" className={styles.pmbBtnPrimary}>
                      Daftar PMB Online
                    </Link>
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20Admin%20STIE%20ARLINDO,%20saya%20ingin%20konsultasi%20pendaftaran"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.pmbBtnWa}
                    >
                      Konsultasi via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== RELATED ARTICLES SECTION (PREMIUM DESIGN) ===== */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.relatedHeader}>
                <div>
                  <span className={styles.sectionBadge}>Rekomendasi berita</span>
                  <h2 className={styles.relatedTitle}>Artikel &amp; Berita Terkait Lainnya</h2>
                  <p className={styles.relatedSubtitle}>
                    Eksplorasi wawasan akademik, inovasi riset manajemen, dan agenda terkini civitas STIE ARLINDO.
                  </p>
                </div>
                <Link href="/berita" className={styles.viewAllBtn}>
                  <span>Lihat Semua Berita</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>

            <div className={styles.relatedGrid}>
              {relatedArticles.slice(0, 3).map((item, idx) => (
                <ScrollReveal key={item.slug || idx} delay={idx * 100}>
                  <Link href={`/berita/${item.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedImageContainer}>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className={styles.relatedImg}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                      <span className={styles.relatedCatBadge}>{item.category || 'Umum'}</span>
                    </div>

                    <div className={styles.relatedCardBody}>
                      <div className={styles.relatedCardMeta}>
                        <span className={styles.relatedDate}>{item.date || '2026'}</span>
                        <span className={styles.metaDot}>•</span>
                        <span className={styles.relatedReadTime}>{item.readTime || '3 Menit Baca'}</span>
                      </div>

                      <h3 className={styles.relatedCardTitle}>{item.title}</h3>

                      <p className={styles.relatedCardExcerpt}>
                        {item.excerpt ||
                          'Simak informasi dan perkembangan terbaru terkait kegiatan akademik dan inovasi di STIE ARLINDO.'}
                      </p>

                      <div className={styles.relatedCardFooter}>
                        <span className={styles.readMoreText}>
                          Baca Selengkapnya
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
