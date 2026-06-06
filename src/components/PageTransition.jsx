'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PageTransition.module.css';

export const PAGE_TRANSITION_EVENT = 'tot-page-transition-start';
export const PAGE_TRANSITION_COVER_MS = 1100;

const RELEASE_START_MS = 1280;
const TRANSITION_DURATION_MS = 2680;
const TRANSITION_RELEASE_AT_KEY = 'tot-page-transition-release-at';
const TRANSITION_ACTIVE_UNTIL_KEY = 'tot-page-transition-active-until';

const PageTransition = () => {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);
  const timeoutRefs = useRef([]);
  const [transitionState, setTransitionState] = useState({
    visible: false,
    phase: 'cover',
    cycle: 0,
  });

  const clearTimers = useCallback(() => {
    timeoutRefs.current.forEach((timerId) => window.clearTimeout(timerId));
    timeoutRefs.current = [];
  }, []);

  const queueTimer = useCallback((callback, delay) => {
    const timerId = window.setTimeout(callback, delay);
    timeoutRefs.current.push(timerId);
  }, []);

  const clearStoredTransition = useCallback(() => {
    window.sessionStorage.removeItem(TRANSITION_RELEASE_AT_KEY);
    window.sessionStorage.removeItem(TRANSITION_ACTIVE_UNTIL_KEY);
  }, []);

  const scheduleTransitionTimers = useCallback((releaseAt, activeUntil) => {
    queueTimer(() => {
      setTransitionState((current) => (
        current.visible ? { ...current, phase: 'release' } : current
      ));
    }, Math.max(0, releaseAt - Date.now()));

    queueTimer(() => {
      clearStoredTransition();
      setTransitionState((current) => ({ ...current, visible: false }));
    }, Math.max(0, activeUntil - Date.now()));
  }, [clearStoredTransition, queueTimer]);

  const startTransition = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clearStoredTransition();
      return;
    }

    const now = Date.now();
    const releaseAt = now + RELEASE_START_MS;
    const activeUntil = now + TRANSITION_DURATION_MS;

    window.sessionStorage.setItem(TRANSITION_RELEASE_AT_KEY, String(releaseAt));
    window.sessionStorage.setItem(TRANSITION_ACTIVE_UNTIL_KEY, String(activeUntil));

    clearTimers();
    setTransitionState((current) => ({
      visible: true,
      phase: 'cover',
      cycle: current.cycle + 1,
    }));

    scheduleTransitionTimers(releaseAt, activeUntil);
  }, [clearStoredTransition, clearTimers, scheduleTransitionTimers]);

  useEffect(() => {
    const activeUntil = Number.parseInt(window.sessionStorage.getItem(TRANSITION_ACTIVE_UNTIL_KEY) || '0', 10);
    const releaseAt = Number.parseInt(window.sessionStorage.getItem(TRANSITION_RELEASE_AT_KEY) || '0', 10);
    const now = Date.now();

    if (!activeUntil || activeUntil <= now) {
      clearStoredTransition();
      return undefined;
    }

    setTransitionState((current) => ({
      visible: true,
      phase: releaseAt <= now ? 'release' : 'cover',
      cycle: current.cycle + 1,
    }));
    scheduleTransitionTimers(releaseAt, activeUntil);

    return undefined;
  }, [clearStoredTransition, scheduleTransitionTimers]);

  useEffect(() => {
    const onTransitionStart = () => startTransition();

    window.__totStartPageTransition = onTransitionStart;
    window.addEventListener(PAGE_TRANSITION_EVENT, onTransitionStart);

    return () => {
      if (window.__totStartPageTransition === onTransitionStart) {
        delete window.__totStartPageTransition;
      }

      window.removeEventListener(PAGE_TRANSITION_EVENT, onTransitionStart);
      clearTimers();
    };
  }, [clearTimers, startTransition]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (!transitionState.visible) {
      startTransition();
    }
  }, [pathname, startTransition, transitionState.visible]);

  return (
    <>
      <span className={styles.sentinel} aria-hidden="true" />

      {transitionState.visible && (
        <>
          <svg className={styles.filterSvg} aria-hidden="true" focusable="false">
            <defs>
              <filter id="tot-goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 28 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
          <div
            key={transitionState.cycle}
            className={`${styles.overlay} ${transitionState.phase === 'release' ? styles.release : styles.cover}`}
            aria-hidden="true"
          >
            <div className={styles.curtain} />
            <div className={`${styles.blob} ${styles.wave}`} />
            <div className={`${styles.blob} ${styles.blobA}`} />
            <div className={`${styles.blob} ${styles.blobB}`} />
            <div className={`${styles.blob} ${styles.blobC}`} />
            <div className={`${styles.blob} ${styles.string} ${styles.stringOne}`} />
            <div className={`${styles.blob} ${styles.string} ${styles.stringTwo}`} />
            <div className={`${styles.blob} ${styles.string} ${styles.stringThree}`} />
            <div className={styles.shine} />
          </div>
        </>
      )}
    </>
  );
};

export default PageTransition;
