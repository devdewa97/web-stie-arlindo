import styles from '@/components/PageLoader/PageLoader.module.css';

const CIRCUMFERENCE = 276.46;

export default function Loading() {
  return (
    <div
      className={`${styles.overlay} ${styles.overlayVisible} ${styles.navBg}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.loaderContent}>
        {/* Animated Circular Progress without Box */}
        <div className={styles.circleWrapper}>
          <div className={styles.outerOrbit} />
          <div className={styles.pulseGlow} />

          <svg
            className={styles.circularSvg}
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="goldGradientLoading" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B8912E" />
                <stop offset="40%" stopColor="#E5C05C" />
                <stop offset="75%" stopColor="#F0D77A" />
                <stop offset="100%" stopColor="#D4A843" />
              </linearGradient>
            </defs>

            <circle
              className={styles.circleTrack}
              cx="50"
              cy="50"
              r="44"
            />

            <circle
              className={styles.circleProgress}
              cx="50"
              cy="50"
              r="44"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * 0.25}
              style={{ stroke: 'url(#goldGradientLoading)' }}
            />
          </svg>

          <div className={styles.circleCenter}>
            <span className={styles.percentNumber}>
              75<span className={styles.percentSymbol}>%</span>
            </span>
          </div>
        </div>

        {/* Clean Floating Brand & Status */}
        <h2 className={styles.brandTitle}>STIE ARLINDO</h2>
        <div className={styles.statusText}>
          <span>Memuat Halaman</span>
          <span className={styles.dotsWrapper} aria-hidden="true">
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </span>
        </div>
      </div>
    </div>
  );
}
