'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PageTransition.module.css';

export const PAGE_TRANSITION_EVENT = 'tot-page-transition-start';
export const PAGE_TRANSITION_COVER_MS = 420;

const TRANSITION_DURATION_MS = 1180;

const PageTransition = () => {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);
  const timeoutRefs = useRef([]);
  const [transitionState, setTransitionState] = useState({
    visible: false,
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

  const startTransition = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    clearTimers();
    setTransitionState((current) => ({
      visible: true,
      cycle: current.cycle + 1,
    }));

    queueTimer(() => {
      setTransitionState((current) => ({ ...current, visible: false }));
    }, TRANSITION_DURATION_MS);
  }, [clearTimers, queueTimer]);

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
            className={styles.overlay}
            aria-hidden="true"
          >
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
