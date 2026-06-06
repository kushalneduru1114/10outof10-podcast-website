'use client';

import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './IntroAnimation.module.css';

const INTRO_LAST_SHOWN_KEY = 'tot-intro-last-shown';
const INTRO_VISITS_KEY = 'tot-intro-visits';
const INTRO_ACTIVE_UNTIL_KEY = 'tot-intro-active-until';
const INTRO_INTERVAL_MS = 1000 * 60 * 60 * 10;
const INTRO_VISIT_INTERVAL = 5;
const INTRO_DURATION_MS = 3600;

const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const now = Date.now();
    const activeUntil = Number.parseInt(window.sessionStorage.getItem(INTRO_ACTIVE_UNTIL_KEY) || '0', 10);

    if (activeUntil > now) {
      setIsVisible(true);
      const remainingTime = activeUntil - now;
      const activeTimer = window.setTimeout(() => {
        window.sessionStorage.removeItem(INTRO_ACTIVE_UNTIL_KEY);
        setIsVisible(false);
      }, remainingTime);

      return () => window.clearTimeout(activeTimer);
    }

    const visitCount = Number.parseInt(window.localStorage.getItem(INTRO_VISITS_KEY) || '0', 10) + 1;
    const lastShown = Number.parseInt(window.localStorage.getItem(INTRO_LAST_SHOWN_KEY) || '0', 10);
    const shouldShow = !lastShown || now - lastShown > INTRO_INTERVAL_MS || visitCount % INTRO_VISIT_INTERVAL === 0;

    window.localStorage.setItem(INTRO_VISITS_KEY, String(visitCount));

    if (!shouldShow) {
      return undefined;
    }

    window.localStorage.setItem(INTRO_LAST_SHOWN_KEY, String(now));
    window.sessionStorage.setItem(INTRO_ACTIVE_UNTIL_KEY, String(now + INTRO_DURATION_MS));
    setIsVisible(true);

    const introTimer = window.setTimeout(() => {
      window.sessionStorage.removeItem(INTRO_ACTIVE_UNTIL_KEY);
      setIsVisible(false);
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(introTimer);
  }, []);

  const skipIntro = () => {
    window.sessionStorage.removeItem(INTRO_ACTIVE_UNTIL_KEY);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.overlay} role="presentation">
      <button type="button" className={styles.closeButton} aria-label="Skip intro animation" onClick={skipIntro}>
        <FaTimes aria-hidden="true" />
      </button>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.orbit} />
        <svg className={styles.micLeft} viewBox="0 0 120 180">
          <rect x="43" y="18" width="34" height="78" rx="17" />
          <path d="M28 76 c0 30 18 48 32 48 s32 -18 32 -48" />
          <path d="M60 124 v32 M38 156 h44" />
          <path d="M47 40 h26 M47 56 h26 M47 72 h26" />
        </svg>
        <svg className={styles.clapboard} viewBox="0 0 180 140">
          <path d="M22 42 h136 v78 h-136 z" />
          <path d="M16 20 l132 -18 l8 38 l-132 18 z" />
          <path d="M36 18 l28 32 M70 13 l28 32 M104 8 l28 32" />
          <path d="M44 70 h92 M44 94 h62" />
        </svg>
        <svg className={styles.micRight} viewBox="0 0 120 180">
          <rect x="43" y="18" width="34" height="78" rx="17" />
          <path d="M28 76 c0 30 18 48 32 48 s32 -18 32 -48" />
          <path d="M60 124 v32 M38 156 h44" />
          <path d="M47 40 h26 M47 56 h26 M47 72 h26" />
        </svg>
        <svg className={styles.filmStrip} viewBox="0 0 340 88">
          <path d="M10 18 h320 v52 h-320 z" />
          <path d="M44 18 v52 M92 18 v52 M140 18 v52 M188 18 v52 M236 18 v52 M284 18 v52" />
          <path d="M20 28 h12 M20 60 h12 M308 28 h12 M308 60 h12" />
        </svg>
      </div>
    </div>
  );
};

export default IntroAnimation;
