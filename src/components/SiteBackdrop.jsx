'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './SiteBackdrop.module.css';

const MEDIA_BACKDROP_ITEMS = [
  { src: 'https://i.ytimg.com/vi/GcdCW_XRoCk/hqdefault.jpg', label: 'Lilly thumbnail' },
  { src: 'https://i.ytimg.com/vi/ciQLCOhymHQ/hqdefault.jpg', label: 'Anjigaadu thumbnail' },
  { src: 'https://i.ytimg.com/vi/O_qo4q1JDbs/hqdefault.jpg', label: 'Friday thumbnail' },
  { src: 'https://i.ytimg.com/vi/ljE4YnD950E/hqdefault.jpg', label: 'Lights Camera Action thumbnail' },
  { src: 'https://i.ytimg.com/vi/xjYFtJDdKgM/hqdefault.jpg', label: 'Tarunam thumbnail' },
  { src: '/assets/FridayEver.jpg', label: 'Every Friday Ever podcast artwork' },
  { src: '/assets/mahanati.jpg', label: 'Mahanati podcast artwork' },
  { src: '/assets/parasite.jpg', label: 'Parasite podcast artwork' },
  { src: '/assets/socialNetwork.jpg', label: 'The Social Network podcast artwork' },
];

const SiteBackdrop = () => {
  const nearLayerRef = useRef(null);
  const farLayerRef = useRef(null);
  const mediaLayerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY || 0;
      document.documentElement.style.setProperty('--parallax-y', `${scrollY}px`);

      if (nearLayerRef.current) {
        nearLayerRef.current.style.transform = `translate3d(0, ${scrollY * -0.08}px, 0)`;
      }

      if (farLayerRef.current) {
        farLayerRef.current.style.transform = `translate3d(0, ${scrollY * -0.035}px, 0)`;
      }

      if (mediaLayerRef.current) {
        mediaLayerRef.current.style.transform = `translate3d(0, ${scrollY * -0.055}px, 0)`;
      }

      rafRef.current = null;
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <div ref={mediaLayerRef} className={styles.mediaLayer}>
        {MEDIA_BACKDROP_ITEMS.map((item, index) => (
          <span
            key={item.src}
            className={styles.mediaThumb}
            data-index={index + 1}
          >
            <Image
              src={item.src}
              alt=""
              fill
              priority={index < 2}
              sizes="(max-width: 760px) 36vw, 16vw"
              className={styles.mediaImage}
            />
          </span>
        ))}
      </div>
      <svg ref={farLayerRef} className={styles.farLayer} viewBox="0 0 1440 1200" preserveAspectRatio="xMidYMid slice">
        <path d="M-40 215 C260 120 450 330 760 230 C990 158 1185 45 1480 150" />
        <path d="M-60 760 C210 620 432 875 710 733 C1000 585 1160 708 1490 555" />
        <circle cx="1160" cy="256" r="84" />
        <circle cx="230" cy="880" r="56" />
        <path d="M104 376 h112 v70 h-112 z M126 376 v70 M172 376 v70 M104 398 h112 M104 424 h112" />
      </svg>
      <svg ref={nearLayerRef} className={styles.nearLayer} viewBox="0 0 1440 1200" preserveAspectRatio="xMidYMid slice">
        <path d="M1158 742 l88 50 -88 50 z" />
        <path d="M330 198 c62 0 112 50 112 112 s-50 112 -112 112 s-112 -50 -112 -112 s50 -112 112 -112z M276 262 h108 M276 310 h108 M276 358 h108" />
        <path d="M931 934 c36 -52 84 -52 120 0 c36 52 84 52 120 0" />
        <path d="M746 470 h132 M812 404 v132" />
        <path d="M120 1040 h210 M120 1082 h148" />
      </svg>
    </div>
  );
};

export default SiteBackdrop;
