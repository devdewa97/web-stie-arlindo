'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { formatImageUrl } from '@/lib/api';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 5;

export default function BeritaClient({
  initialNews = [],
  initialCategories = [],
  initialKategori = '',
  initialQuery = '',
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search and Category states
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [activeCategory, setActiveCategory] = useState(
    initialKategori ? initialKategori.toLowerCase() : 'semua'
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Sync state with URL params if they change externally
  useEffect(() => {
    const urlKat = searchParams.get('kategori');
    const urlQ = searchParams.get('q') || searchParams.get('search');
    if (urlKat !== null) {
      setActiveCategory(urlKat.toLowerCase() || 'semua');
      setCurrentPage(1);
    }
    if (urlQ !== null) {
      setSearchQuery(urlQ);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Update browser URL query params without reloading
  const updateUrl = (cat, q) => {
    const params = new URLSearchParams();
    if (cat && cat !== 'semua') {
      params.set('kategori', cat);
    }
    if (q && q.trim()) {
      params.set('q', q.trim());
    }
    const queryString = params.toString();
    const newUrl = queryString ? `/berita?${queryString}` : '/berita';
    window.history.replaceState(null, '', newUrl);
  };

  const handleCategoryClick = (catSlug) => {
    const newCat = catSlug.toLowerCase();
    setActiveCategory(newCat);
    setCurrentPage(1);
    updateUrl(newCat, searchQuery);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
    updateUrl(activeCategory, val);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    updateUrl(activeCategory, '');
  };

  const handleResetAll = () => {
    setActiveCategory('semua');
    setSearchQuery('');
    setCurrentPage(1);
    updateUrl('semua', '');
  };

  // Helper to format display date
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Build category list with dynamic article counts
  const categoryList = useMemo(() => {
    const cats = [...initialCategories];

    const defaults = [
      { name: 'PMB', slug: 'pmb' },
      { name: 'Akademik', slug: 'akademik' },
      { name: 'Kegiatan', slug: 'kegiatan' },
      { name: 'Prestasi', slug: 'prestasi' },
      { name: 'Kerjasama', slug: 'kerjasama' },
      { name: 'Umum', slug: 'umum' },
    ];

    defaults.forEach((def) => {
      if (!cats.some((c) => c.slug === def.slug || c.name.toLowerCase() === def.name.toLowerCase())) {
        cats.push(def);
      }
    });

    return cats.map((cat) => {
      const count = initialNews.filter((item) => {
        const itemCat = (item.category || item.category_slug || '').toLowerCase();
        const catSlug = (cat.slug || '').toLowerCase();
        const catName = (cat.name || '').toLowerCase();
        return (
          itemCat === catSlug ||
          itemCat.includes(catSlug) ||
          itemCat.includes(catName) ||
          catName.includes(itemCat)
        );
      }).length;

      return {
        ...cat,
        computedCount: count,
      };
    });
  }, [initialCategories, initialNews]);

  // Total articles count
  const totalArticlesCount = initialNews.length;

  // Filtered articles based on activeCategory and searchQuery
  const filteredArticles = useMemo(() => {
    return initialNews.filter((item) => {
      // 1. Category Filter
      let matchCat = true;
      if (activeCategory && activeCategory !== 'semua') {
        const itemCat = (item.category || item.category_slug || '').toLowerCase();
        const currentTarget = activeCategory.toLowerCase();
        matchCat =
          itemCat === currentTarget ||
          itemCat.includes(currentTarget) ||
          (currentTarget === 'pmb' && itemCat.includes('pmb')) ||
          (currentTarget === 'akademik' && itemCat.includes('akademik')) ||
          (currentTarget === 'kegiatan' && itemCat.includes('kegiatan')) ||
          (currentTarget === 'prestasi' && itemCat.includes('prestasi')) ||
          (currentTarget === 'kerjasama' && itemCat.includes('kerjasama')) ||
          (currentTarget === 'umum' && itemCat.includes('umum'));
      }

      // 2. Search Query Filter
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const title = (item.title || '').toLowerCase();
        const excerpt = (item.excerpt || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        matchSearch = title.includes(q) || excerpt.includes(q) || cat.includes(q);
      }

      return matchCat && matchSearch;
    });
  }, [initialNews, activeCategory, searchQuery]);

  // Pagination calculation (maksimal 5 artikel per halaman)
  const totalPages = useMemo(() => {
    return Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  }, [filteredArticles]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = useMemo(() => {
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, startIndex]);

  // Layout separation for current page:
  // Page 1: 1 Featured Article ("Berita Utama") + 4 Grid Articles (Total = 5)
  // Page 2+: 5 Grid Articles
  const isFirstPage = currentPage === 1;
  const featuredArticle = isFirstPage && currentArticles.length > 0 ? currentArticles[0] : null;
  const gridArticles = isFirstPage ? currentArticles.slice(1) : currentArticles;

  // Scroll to section on page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    const element = document.getElementById('koleksi-berita');
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Find active category label
  const activeCategoryObj = useMemo(() => {
    if (activeCategory === 'semua') return null;
    return (
      categoryList.find(
        (c) =>
          (c.slug && c.slug.toLowerCase() === activeCategory) ||
          c.name.toLowerCase() === activeCategory
      ) || { name: activeCategory }
    );
  }, [activeCategory, categoryList]);

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
              <span className={styles.breadcrumbCurrent}>Berita &amp; Pengumuman</span>
            </div>

            {/* Title */}
            <h1 className={styles.heroTitle}>
              Kabar &amp; Agenda Kampus: <br />
              <span className={styles.heroHighlight}>Informasi Terkini Civitas Akademika</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Ikuti liputan agenda perkuliahan, prestasi mahasiswa, seminar nasional, kemitraan
              industri Arlindo Group, dan kabar resmi dari Sekolah Tinggi Ilmu Ekonomi (STIE) ARLINDO.
            </p>

            {/* Quick Actions */}
            <div className={styles.heroActions}>
              <a href="#koleksi-berita" className="btn btn-gold">
                <span>Eksplorasi Berita</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
              <Link href="/pmb" className="btn btn-outline">
                Informasi PMB 2026
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARTIKEL & BERITA KAMPUS DENGAN SIDEBAR & SEARCH ===== */}
      <section className={styles.newsSection} id="koleksi-berita" style={{ background: '#F8FAFC', paddingTop: '3.5rem' }}>
        <div className="container">

          {/* ── TOP SEARCH BAR ── */}
          <div className={styles.searchToolbarCard}>
            <div className={styles.searchBarWrapper}>
              <div className={styles.searchIconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Cari artikel, pengumuman, atau kata kunci..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className={styles.clearSearchBtn}
                  title="Hapus pencarian"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* ── ACTIVE FILTER CHIPS ── */}
          {(activeCategory !== 'semua' || searchQuery.trim() !== '') && (
            <div className={styles.activeFiltersBar}>
              <div className={styles.filterChipGroup}>
                <span className={styles.filterLabel}>Filter Aktif:</span>

                {activeCategory !== 'semua' && (
                  <span className={styles.filterChip}>
                    <span className={styles.chipText}>
                      Kategori: <strong>{activeCategoryObj ? activeCategoryObj.name : activeCategory}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick('semua')}
                      className={styles.chipRemoveBtn}
                      title="Hapus filter kategori"
                    >
                      ✕
                    </button>
                  </span>
                )}

                {searchQuery.trim() !== '' && (
                  <span className={styles.filterChip}>
                    <span className={styles.chipText}>
                      Kata kunci: &ldquo;<strong>{searchQuery}</strong>&rdquo;
                    </span>
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className={styles.chipRemoveBtn}
                      title="Hapus pencarian"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetAll}
                className={styles.resetAllBtn}
              >
                Reset Semua Filter
              </button>
            </div>
          )}

          {/* ── TWO-COLUMN EDITORIAL LAYOUT ── */}
          <div className={styles.editorialLayout}>

            {/* ── COLUMN 1: MAIN ARTICLE STREAM ── */}
            <main className={styles.mainStream}>
              {filteredArticles.length === 0 ? (
                /* EMPTY STATE */
                <div className={styles.emptyStateCard}>
                  <div className={styles.emptyIconBox}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                  <h3 className={styles.emptyTitle}>Tidak Ada Artikel yang Cocok</h3>
                  <p className={styles.emptySubtitle}>
                    {searchQuery.trim()
                      ? `Tidak ditemukan berita dengan kata kunci "${searchQuery}" pada kategori yang dipilih.`
                      : 'Belum ada artikel berita yang diterbitkan dalam kategori ini.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="btn btn-gold"
                    style={{ marginTop: '1rem' }}
                  >
                    Tampilkan Semua Berita
                  </button>
                </div>
              ) : (
                <>
                  {/* FEATURED ARTICLE (HANYA DI HALAMAN 1) */}
                  {featuredArticle && (
                    <ScrollReveal>
                      <Link href={`/berita/${featuredArticle.slug}`} className={styles.featuredCard}>
                        <div className={styles.featuredImage}>
                          <Image
                            src={formatImageUrl(featuredArticle.image) || '/images/news-pmb.jpg'}
                            alt={featuredArticle.title || 'Berita Utama'}
                            fill
                            sizes="(max-width: 860px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            priority
                          />
                          <span className={styles.featuredBadge}>
                            {featuredArticle.featured || featuredArticle.is_featured ? 'Berita Utama' : 'Pilihan Redaksi'}
                          </span>
                        </div>
                        <div className={styles.featuredContent}>
                          <div className={styles.featuredCatWrap}>
                            <span className={styles.newsCat}>
                              {featuredArticle.category || 'Berita Kampus'}
                            </span>
                          </div>
                          <h2>{featuredArticle.title}</h2>
                          <p>{featuredArticle.excerpt}</p>
                          <div className={styles.featuredFooter}>
                            <span className={styles.newsDate}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              {formatDisplayDate(featuredArticle.published_at || featuredArticle.date)}
                            </span>
                            <span className={styles.readMoreLink}>
                              Baca Selengkapnya
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  )}

                  {/* ARTICLES GRID */}
                  {gridArticles.length > 0 && (
                    <div className={styles.editorialGrid}>
                      {gridArticles.map((news, index) => (
                        <ScrollReveal key={news.id || news.slug || index} delay={(index % 4) * 60}>
                          <Link href={`/berita/${news.slug}`} className={styles.newsCard}>
                            <div className={styles.newsThumb}>
                              <Image
                                src={formatImageUrl(news.image) || '/images/news-workshop.jpg'}
                                alt={news.title || 'Artikel'}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <div className={styles.newsBody}>
                              <div>
                                <span className={styles.newsCat}>
                                  {news.category || 'Berita'}
                                </span>
                              </div>
                              <h3>{news.title}</h3>
                              <p>{news.excerpt}</p>
                              <div className={styles.newsFooter}>
                                <span className={styles.newsDate}>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  {formatDisplayDate(news.published_at || news.date)}
                                </span>
                                <span className={styles.readMoreLink}>
                                  Baca
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </ScrollReveal>
                      ))}
                    </div>
                  )}

                  {/* ── PAGINATION NUMBER SECTION ── */}
                  {totalPages > 1 && (
                    <div className={styles.paginationWrapper}>
                      <div className={styles.paginationInfo}>
                        Menampilkan <strong>{startIndex + 1}</strong> - <strong>{Math.min(startIndex + ITEMS_PER_PAGE, filteredArticles.length)}</strong> dari <strong>{filteredArticles.length}</strong> artikel
                      </div>

                      <div className={styles.paginationNav}>
                        {/* Tombol Sebelumnya */}
                        <button
                          type="button"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`${styles.pageNavBtn} ${currentPage === 1 ? styles.pageNavDisabled : ''}`}
                          title="Halaman Sebelumnya"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                          <span>Sebelumnya</span>
                        </button>

                        {/* Nomor Halaman */}
                        <div className={styles.pageNumbersGroup}>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => handlePageChange(pageNum)}
                              className={`${styles.pageNumberBtn} ${currentPage === pageNum ? styles.pageNumberActive : ''
                                }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        {/* Tombol Selanjutnya */}
                        <button
                          type="button"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`${styles.pageNavBtn} ${currentPage === totalPages ? styles.pageNavDisabled : ''
                            }`}
                          title="Halaman Selanjutnya"
                        >
                          <span>Selanjutnya</span>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>

            {/* ── COLUMN 2: SIDEBAR KATEGORI & WIDGETS ── */}
            <aside className={styles.beritaSidebar}>

              {/* WIDGET 1: SIDEBAR KATEGORI */}
              <div className={styles.sidebarWidget}>
                <div className={styles.widgetHeader}>
                  <div>
                    <h4 className={styles.widgetTitle}>Kategori Berita</h4>
                    <p className={styles.widgetSubtitle}>Filter Berita sesuai topik</p>
                  </div>
                </div>

                <div className={styles.categoryMenu}>
                  {/* Opsi: Semua Kategori */}
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('semua')}
                    className={`${styles.categoryMenuItem} ${activeCategory === 'semua' ? styles.categoryMenuItemActive : ''
                      }`}
                  >
                    <div className={styles.catLeftWrap}>
                      <span className={styles.catDot} />
                      <span className={styles.catItemName}>Semua Kategori</span>
                    </div>
                    <span className={styles.catBadgeCount}>{totalArticlesCount}</span>
                  </button>

                  {/* Kategori Dinamis */}
                  {categoryList.map((cat, idx) => {
                    const catSlug = (cat.slug || cat.name).toLowerCase();
                    const isActive = activeCategory === catSlug || activeCategory === cat.name.toLowerCase();

                    return (
                      <button
                        key={cat.id || cat.slug || idx}
                        type="button"
                        onClick={() => handleCategoryClick(cat.slug || cat.name)}
                        className={`${styles.categoryMenuItem} ${isActive ? styles.categoryMenuItemActive : ''
                          }`}
                      >
                        <div className={styles.catLeftWrap}>
                          <span className={styles.catDot} />
                          <span className={styles.catItemName}>{cat.name}</span>
                        </div>
                        <span className={styles.catBadgeCount}>
                          {cat.computedCount ?? (cat.news_count ?? 0)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* WIDGET 2: CTA PMB & BEASISWA */}
              <div className={styles.pmbPromoCard}>
                <div className={styles.pmbBadge}>PMB 2026/2027</div>
                <h4 className={styles.pmbTitle}>Kuliah Manajemen Unggul &amp; Modern</h4>
                <p className={styles.pmbDesc}>
                  Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027 telah dibuka. Raih beasiswa dan potongan biaya kuliah!
                </p>
                <Link href="/pmb" className={styles.pmbBtn}>
                  <span>Daftar PMB Sekarang</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* WIDGET 3: INFO MEDIA & REDAKSI */}
              <div className={styles.editorialInfoCard}>
                <div className={styles.editorialIconBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className={styles.editorialText}>
                  <div className={styles.editorialHeading}>Biro Media Arlindo</div>
                  <p className={styles.editorialSub}>
                    Punya informasi kegiatan kampus atau ingin bermitra publikasi berita?
                  </p>
                  <Link href="/kontak" className={styles.editorialLink}>
                    Hubungi Redaksi &rarr;
                  </Link>
                </div>
              </div>

            </aside>

          </div>
        </div>
      </section>
    </>
  );
}
