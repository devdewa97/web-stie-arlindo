'use client';

import { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // check on mount

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      className={`${styles.backToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Kembali ke atas halaman"
      title="Kembali ke atas"
    >
      <div className={styles.iconWrapper}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.arrowIcon}
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </div>
      <span className={styles.tooltip}>Ke Atas</span>
    </button>
  );
}
