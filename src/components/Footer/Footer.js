'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSettings } from '@/lib/useSettings';
import styles from './Footer.module.css';

// Encrypted Byte-Array Signature for Mas Dewa
const _0x5e2b = [
  0x44, 0x65, 0x76, 0x65, 0x6c, 0x6f, 0x70, 0x65, 0x64, 0x20,
  0x62, 0x79, 0x20, 0x4d, 0x61, 0x73, 0x20, 0x44, 0x65, 0x77, 0x61
];
const _0xdec = () => _0x5e2b.map((_x) => String.fromCharCode(_x)).join('');

export default function Footer() {
  const { settings } = useSettings();
  const bottomInnerRef = useRef(null);

  useEffect(() => {
    const signature = _0xdec();
    const targetId = '_arl_dev_auth';

    const enforceCredit = () => {
      let node = document.getElementById(targetId);
      const container = bottomInnerRef.current || document.querySelector(`.${styles.bottomInner}`);

      if (!node) {
        if (!container) return;
        node = document.createElement('p');
        node.id = targetId;
        node.className = styles.bottomSub;
        container.appendChild(node);
      }

      // Pastikan teks selalu sesuai signature
      if (node.textContent !== signature) {
        node.textContent = signature;
      }

      // Cegah upaya penyembunyian via CSS inline atau style override
      if (typeof window !== 'undefined') {
        const computed = window.getComputedStyle(node);
        if (
          computed.display === 'none' ||
          computed.visibility === 'hidden' ||
          computed.opacity === '0' ||
          computed.fontSize === '0px' ||
          node.offsetHeight === 0
        ) {
          node.style.setProperty('display', 'block', 'important');
          node.style.setProperty('visibility', 'visible', 'important');
          node.style.setProperty('opacity', '1', 'important');
          node.style.setProperty('font-size', '0.92rem', 'important');
          node.style.setProperty('color', 'var(--gold-400, #d4a843)', 'important');
          node.style.setProperty('margin-top', '4px', 'important');
        }
      }
    };

    enforceCredit();

    // Watcher: Jika ada perubahan DOM, atribut, teks, atau penghapusan elemen
    const observer = new MutationObserver(() => {
      enforceCredit();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // Heartbeat check setiap 1.5 detik sebagai backup
    const heartbeat = setInterval(enforceCredit, 1500);

    return () => {
      observer.disconnect();
      clearInterval(heartbeat);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerContainer}>
          <div className={styles.grid}>
            {/* About */}
            <div className={styles.col}>
              <div className={styles.footerLogo}>
                <Image
                  src="/images/logo.png"
                  alt={settings.site_name || 'STIE ARLINDO'}
                  width={220}
                  height={68}
                  className={styles.footerLogoImg}
                />
              </div>
              <p className={styles.footerAbout}>
                {settings.site_description || 'Menjadi lembaga pendidikan tinggi manajemen dan ekonomi yang unggul dan bermartabat di ASEAN pada tahun 2030.'}
              </p>
              <div className={styles.socials}>
                {settings.instagram && (
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </a>
                )}
                {settings.facebook && (
                  <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" /></svg>
                  </a>
                )}
                {settings.youtube && (
                  <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Link Cepat</h4>
              <ul className={styles.linkList}>
                <li><Link href="/tentang-kami">Tentang Kami</Link></li>
                <li><Link href="/program-studi">Program Studi</Link></li>
                <li><Link href="/pmb">Pendaftaran</Link></li>
                <li><Link href="/berita">Berita</Link></li>
                <li><Link href="/gallery">Galeri</Link></li>
                <li><Link href="/kontak">Hubungi Kami</Link></li>
              </ul>
            </div>

            {/* Academic */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Akademik</h4>
              <ul className={styles.linkList}>
                <li>
                  <a
                    href={settings.ejournal_url && settings.ejournal_url !== '#' ? settings.ejournal_url : '#'}
                    target={settings.ejournal_url && settings.ejournal_url !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    E-Journal
                  </a>
                </li>
                <li>
                  <a
                    href={settings.siakad_url && settings.siakad_url !== '#' ? settings.siakad_url : '#'}
                    target={settings.siakad_url && settings.siakad_url !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    Siakad
                  </a>
                </li>
                <li>
                  <a
                    href={settings.portal_url && settings.portal_url !== '#' ? settings.portal_url : '#'}
                    target={settings.portal_url && settings.portal_url !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    Portal Mahasiswa
                  </a>
                </li>
                <li><Link href="/program-studi">S1 Manajemen</Link></li>
                <li><Link href="/tentang-kami">Profil Kampus</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Kontak</h4>
              <ul className={styles.contactList}>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactSvg}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span>{settings.address}</span>
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactSvg}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <a href={`mailto:${settings.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {settings.email}
                  </a>
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactSvg}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  <span>{settings.phone}</span>
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactSvg}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <span>Senin - Jumat: 08:00 - 16:30 WIB</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerContainer}>
          <div ref={bottomInnerRef} className={styles.bottomInner}>
            <p>&copy; {new Date().getFullYear()} {settings.site_name || 'STIE ARLINDO'}. All rights reserved.</p>
            <p id="_arl_dev_auth" className={styles.bottomSub}></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
