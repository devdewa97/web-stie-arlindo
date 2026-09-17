'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/lib/useSettings';
import { formatImageUrl } from '@/lib/api';
import styles from './PopupBanner.module.css';

export default function PopupBanner() {
  const { settings, loading } = useSettings();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Only show on homepage
    if (pathname !== '/') return;
    if (loading) return;
    if (settings.popup_enabled !== 'true') return;

    // Check if already shown this session
    const sessionKey = 'stie_popup_shown';
    if (sessionStorage.getItem(sessionKey)) return;

    // Show popup after page finishes loading with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(sessionKey, 'true');
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname, loading, settings.popup_enabled]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 350);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isVisible && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible, isClosing]);

  if (!isVisible) return null;

  const isImageMode = settings.popup_type === 'image';
  const hasUploadedImage = settings.popup_image && settings.popup_image.trim() !== '';
  const hasImageUrl = settings.popup_image_url && settings.popup_image_url.trim() !== '';
  const hasImage = hasUploadedImage || hasImageUrl;
  const hasContent = settings.popup_title || settings.popup_content;

  // Don't render if there's nothing to show
  if (isImageMode && !hasImage) return null;
  if (!isImageMode && !hasContent) return null;

  // Uploaded image takes priority over external URL
  const imageUrl = hasUploadedImage ? formatImageUrl(settings.popup_image) : (hasImageUrl ? settings.popup_image_url : '');

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Pop Up Informasi"
    >
      <div className={`${styles.popup} ${isClosing ? styles.popupClosing : ''} ${isImageMode ? styles.popupImage : styles.popupText}`}>
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Tutup Pop Up"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image Mode */}
        {isImageMode && hasImage && (
          <div className={styles.imageContainer}>
            {settings.popup_image_link ? (
              <a
                href={settings.popup_image_link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageLink}
              >
                <img
                  src={imageUrl}
                  alt="Pop Up Banner"
                  className={styles.popupImg}
                  loading="eager"
                />
              </a>
            ) : (
              <img
                src={imageUrl}
                alt="Pop Up Banner"
                className={styles.popupImg}
                loading="eager"
              />
            )}
          </div>
        )}

        {/* Text Mode */}
        {!isImageMode && (
          <div className={styles.textContainer}>
            <div className={styles.textBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Informasi
            </div>

            {settings.popup_title && (
              <h2 className={styles.textTitle}>{settings.popup_title}</h2>
            )}

            {settings.popup_content && (
              <div className={styles.textContent}>
                {settings.popup_content.split('\n').map((line, i) => (
                  <p key={i}>{line || '\u00A0'}</p>
                ))}
              </div>
            )}

            {settings.popup_button_text && settings.popup_button_link && (
              <div className={styles.buttonRow}>
                <a
                  href={settings.popup_button_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                >
                  {settings.popup_button_text}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
