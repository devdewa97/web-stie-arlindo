'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/program-studi', label: 'Program Studi' },
  { href: '/gallery', label: 'Galeri' },
  { href: '/pmb', label: 'PMB' },
  { href: '/berita', label: 'Berita' },
  { href: '/kontak', label: 'Kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Main navbar */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} aria-label="STIE ARLINDO Beranda">
            <Image
              src="/images/logo.png"
              alt="Logo STIE ARLINDO"
              width={140}
              height={42}
              priority
              className={styles.logoImg}
            />
          </Link>

          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/pmb" className={`btn btn-gold btn-sm ${styles.ctaBtn}`}>
            Daftar Sekarang
          </Link>

          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/pmb" className="btn btn-gold" onClick={() => setMobileOpen(false)}>
            Daftar Sekarang
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}
    </>
  );
}
