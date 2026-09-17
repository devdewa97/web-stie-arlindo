'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSettings } from '@/lib/useSettings';
import { cleanWhatsAppNumber } from '@/lib/api';
import styles from './LiveChat.module.css';

export default function LiveChat() {
  const { settings } = useSettings();
  const waNumber = cleanWhatsAppNumber(settings?.whatsapp || settings?.phone);
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.liveChatWrapper} ref={widgetRef}>
      {/* Floating Trigger Button (otomatis sembunyi saat modal chat terbuka) */}
      <button
        type="button"
        className={`${styles.chatTrigger} ${isOpen ? styles.triggerHidden : ''}`}
        onClick={toggleChat}
        aria-label="Buka Live Chat STIE ARLINDO"
        title="Live Chat STIE ARLINDO"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.chatIcon}
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>

        <span className={styles.triggerLabel}>Live Chat</span>
      </button>

      {/* Live Chat Popup Window */}
      <div className={`${styles.chatModal} ${isOpen ? styles.modalOpen : ''}`}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className={styles.onlineBadge} />
            </div>
            <div className={styles.headerInfo}>
              <h3 className={styles.headerTitle}>STIE ARLINDO Live Care</h3>
              <p className={styles.headerStatus}>
                <span className={styles.statusDotGreen} /> Online • Siap Membantu Anda
              </p>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Tutup jendela chat"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {/* Welcome Greeting Bubble */}
          <div className={styles.greetingBubble}>
            <div className={styles.greetingText}>
              <strong>Halo! 👋 Selamat datang di STIE ARLINDO.</strong>
              <p>Ada yang bisa kami bantu? Silakan pilih opsi saluran komunikasi langsung di bawah ini:</p>
            </div>
            <span className={styles.greetingTime}>Baru saja</span>
          </div>

          {/* Options List */}
          <div className={styles.optionsList}>
            {/* Option 1: WhatsApp Admisi & PMB */}
            <a
              href={`https://wa.me/${waNumber}?text=Halo%20Admisi%20STIE%20ARLINDO,%20saya%20ingin%20konsultasi%20pendaftaran%20kuliah`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.optionCard} ${styles.optionCardHighlighted}`}
            >
              <div className={`${styles.optionIcon} ${styles.waIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div className={styles.optionContent}>
                <div className={styles.optionTitleRow}>
                  <span className={styles.optionTitle}>WhatsApp Admisi PMB</span>
                  <span className={styles.badgeFast}>Fast Response</span>
                </div>
                <p className={styles.optionDesc}>
                  Konsultasi pendaftaran mahasiswa baru, rincian biaya &amp; beasiswa.
                </p>
              </div>
              <div className={styles.optionArrow}>→</div>
            </a>

            {/* Option 2: WhatsApp Layanan Akademik */}
            <a
              href={`https://wa.me/${waNumber}?text=Halo%20Layanan%20Akademik%20STIE%20ARLINDO,%20saya%20ingin%20bertanya%20seputar%20layanan%20akademik`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.optionCard}
            >
              <div className={`${styles.optionIcon} ${styles.academicIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div className={styles.optionContent}>
                <div className={styles.optionTitleRow}>
                  <span className={styles.optionTitle}>Layanan Akademik &amp; Mahasiswa</span>
                </div>
                <p className={styles.optionDesc}>
                  Informasi SIAKAD, jadwal kuliah, perkuliahan &amp; surat akademik.
                </p>
              </div>
              <div className={styles.optionArrow}>→</div>
            </a>

            {/* Option 3: Kirim Pesan & Kontak */}
            <div className={styles.bottomActions}>
              <Link href="/kontak" className={styles.actionBtnSmall} onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Formulir Kontak</span>
              </Link>
              <Link href="/pmb" className={`${styles.actionBtnSmall} ${styles.actionBtnGold}`} onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>Daftar Online</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.footerNote}>
            <span>🔒 Terhubung langsung ke Admin Resmi STIE ARLINDO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
