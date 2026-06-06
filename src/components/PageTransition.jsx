'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PageTransition.module.css';

export const PAGE_TRANSITION_EVENT = 'tot-page-transition-start';

const ENTER_DURATION_MS = 480;
const EXIT_DURATION_MS = 480;

const PageTransition = () => {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);
  const timeoutRefs = useRef([]);
  const [transitionState, setTransitionState] = useState({
    visible: false,
    phase: 'enter',
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
      phase: 'enter',
      cycle: current.cycle + 1,
    }));

    queueTimer(() => {
      setTransitionState((current) => (
        current.visible ? { ...current, phase: 'exit' } : current
      ));

      queueTimer(() => {
        setTransitionState((current) => ({ ...current, visible: false }));
      }, EXIT_DURATION_MS);
    }, ENTER_DURATION_MS);
  }, [clearTimers, queueTimer]);

  useEffect(() => {
    const onTransitionStart = () => startTransition();

    window.addEventListener(PAGE_TRANSITION_EVENT, onTransitionStart);

    return () => {
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

  if (!transitionState.visible) {
    return null;
  }

  return (
    <>
      <svg className={styles.filterSvg} aria-hidden="true" focusable="false">
        <defs>
          <filter id="tot-goo">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div
        key={transitionState.cycle}
        className={`${styles.overlay} ${transitionState.phase === 'exit' ? styles.exit : styles.enter}`}
        aria-hidden="true"
      />
    </>
  );
};

export default PageTransition;
