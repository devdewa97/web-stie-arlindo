'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './PageLoader.module.css';

const CIRCUMFERENCE = 276.46; // 2 * Math.PI * 44

function getPageName(path) {
  if (!path || path === '/') return 'Beranda';
  if (path.startsWith('/tentang-kami')) return 'Tentang Kami';
  if (path.startsWith('/program-studi')) return 'Program Studi';
  if (path.startsWith('/gallery')) return 'Galeri Kampus';
  if (path.startsWith('/pmb')) return 'PMB STIE Arlindo';
  if (path.startsWith('/berita/')) return 'Artikel Berita';
  if (path.startsWith('/berita')) return 'Berita & Informasi';
  if (path.startsWith('/kontak')) return 'Kontak Kami';
  return 'Halaman Kampus';
}

function PageLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const [progress, setProgress] = useState(0);
  const [targetName, setTargetName] = useState('Beranda');

  const progressIntervalRef = useRef(null);
  const safetyTimeoutRef = useRef(null);
  const finishTimeoutRef = useRef(null);
  const currentKeyRef = useRef(`${pathname}?${searchParams?.toString() || ''}`);

  const clearTimers = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
  };

  const startProgress = (pageName = 'Halaman', isInitialLoad = false) => {
    clearTimers();
    setTargetName(pageName);
    setIsInitial(isInitialLoad);
    setIsLoading(true);
    setProgress(18);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) return 88;
        const remaining = 88 - prev;
        const step = Math.max(1, Math.floor(remaining * 0.22));
        return prev + step;
      });
    }, 100);

    safetyTimeoutRef.current = setTimeout(() => {
      finishProgress();
    }, 4500);
  };

  const finishProgress = () => {
    clearTimers();
    setProgress(100);

    finishTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsInitial(false);
      }, 350);
    }, 220);
  };

  // 1. Initial Page Load
  useEffect(() => {
    const initialName = getPageName(window.location.pathname);
    startProgress(initialName, true);

    const onComplete = () => {
      setTimeout(() => {
        finishProgress();
      }, 300);
    };

    if (document.readyState === 'complete') {
      onComplete();
    } else {
      window.addEventListener('load', onComplete);
      return () => window.removeEventListener('load', onComplete);
    }
  }, []);

  // 2. Detect Route Change Completion
  useEffect(() => {
    const newKey = `${pathname}?${searchParams?.toString() || ''}`;
    if (newKey !== currentKeyRef.current) {
      currentKeyRef.current = newKey;
      finishProgress();
    }
  }, [pathname, searchParams]);

  // 3. Intercept Clicks on Internal Navigation Links
  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('whatsapp:')
      ) {
        return;
      }

      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(anchor.href, window.location.href);

        if (targetUrl.origin !== currentUrl.origin) return;
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }

        const destName = getPageName(targetUrl.pathname);
        startProgress(destName, false);
      } catch {
        // Ignore invalid URL
      }
    };

    const handlePopState = () => {
      const destName = getPageName(window.location.pathname);
      startProgress(destName, false);
    };

    const handleCustomStart = (e) => {
      const destName = e.detail?.name || getPageName(e.detail?.path || '');
      startProgress(destName, false);
    };

    const handleCustomStop = () => {
      finishProgress();
    };

    document.addEventListener('click', handleLinkClick, { capture: true });
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('stie-load-start', handleCustomStart);
    window.addEventListener('stie-load-stop', handleCustomStop);

    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('stie-load-start', handleCustomStart);
      window.removeEventListener('stie-load-stop', handleCustomStop);
      clearTimers();
    };
  }, []);

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <>
      {/* Top Nano Progress Bar */}
      <div
        className={styles.topProgressBar}
        style={{
          width: `${progress}%`,
          opacity: isLoading ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Main Overlay with NO box */}
      <div
        className={`${styles.overlay} ${
          isLoading ? styles.overlayVisible : styles.overlayHidden
        } ${isInitial ? styles.initialBg : styles.navBg}`}
        role="status"
        aria-live="polite"
        aria-busy={isLoading}
      >
        <div className={styles.loaderContent}>
          {/* Animated Circular Progress with Center Percentage */}
          <div className={styles.circleWrapper}>
            <div className={styles.outerOrbit} />
            <div className={styles.pulseGlow} />

            <svg
              className={styles.circularSvg}
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B8912E" />
                  <stop offset="40%" stopColor="#E5C05C" />
                  <stop offset="75%" stopColor="#F0D77A" />
                  <stop offset="100%" stopColor="#D4A843" />
                </linearGradient>
              </defs>

              {/* Background Track Circle */}
              <circle
                className={styles.circleTrack}
                cx="50"
                cy="50"
                r="44"
              />

              {/* Dynamic Animated Progress Circle */}
              <circle
                className={styles.circleProgress}
                cx="50"
                cy="50"
                r="44"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>

            {/* Percentage Text in Center */}
            <div className={styles.circleCenter}>
              <span className={styles.percentNumber}>
                {Math.round(progress)}
                <span className={styles.percentSymbol}>%</span>
              </span>
            </div>
          </div>

          {/* Clean Floating Brand & Status Text (No Box) */}
          <h2 className={styles.brandTitle}>STIE ARLINDO</h2>
          <div className={styles.statusText}>
            <span>Membuka</span>
            <span className={styles.highlightText}>{targetName}</span>
            <span className={styles.dotsWrapper} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <PageLoaderContent />
    </Suspense>
  );
}
