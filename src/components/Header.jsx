'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css';
import TransitionLink from './TransitionLink';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'OUR WORK', href: '/work' },
  { name: 'BLOG', href: '/blog' },
  { name: 'OUR TEAM', href: '/team' },
  { name: 'CONTACT US', href: '/contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((current) => !current);
  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem('tot-theme', nextTheme);
      return nextTheme;
    });
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('tot-theme');
    const initialTheme = savedTheme || document.documentElement.dataset.theme || 'dark';

    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <TransitionLink href="/" className={styles.logoContainer} onClick={closeMenu}>
          <div style={{ position: 'relative', width: '2rem', height: '2rem' }}>
            <Image src="/assets/logo-nobg.png" alt="Ten Out Of Ten logo" fill style={{ objectFit: 'contain' }} />
          </div>
          <span className={styles.logoText}>TEN OUT OF TEN</span>
        </TransitionLink>

        <nav className={styles.nav} aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <TransitionLink key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </TransitionLink>
          ))}
        </nav>

        <button
          type="button"
          className={styles.themeButton}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
        </button>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className={`${styles.mobileMenuOverlay} ${styles.open}`}
          aria-label="Mobile navigation"
        >
          <div className={styles.mobileMenuContent}>
            {NAV_LINKS.map((link) => (
              <TransitionLink key={link.name} href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
                {link.name}
              </TransitionLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
