import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaFilm, FaSpotify } from 'react-icons/fa';
import { SPOTIFY_SHOW_URL } from './data';
import HeroSpotifyWidget from './HeroSpotifyWidget';
import styles from './HeroSection.module.css';
import TransitionLink from './TransitionLink';

const HERO_IMAGES = [
  { src: '/assets/FridayPic.jpg', alt: 'Friday independent film poster' },
  { src: '/assets/TarunamPic.jpg', alt: 'Tarunam short film poster' },
  { src: '/assets/LCApic.jpg', alt: 'Lights, Camera & Action short film still' },
  { src: '/assets/mahanati.jpg', alt: 'Mahanati episode artwork' },
];

const HERO_STATS = [
  { value: '45', label: 'Episodes' },
  { value: '3', label: 'Seasons' },
  { value: 'Shorts', label: 'Presented & Distributed' },
];

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageCollage} aria-hidden="true">
        {HERO_IMAGES.map((image, index) => (
          <div key={image.src} className={`${styles.imageFrame} ${styles[`frame${index + 1}`]}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 42vw, 24vw"
              className={styles.heroImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.scrim} />

      <div className={styles.container}>
        <div className={styles.copyBlock}>
          <p className={styles.eyebrow}>
            <FaFilm aria-hidden="true" />
            Cinema Podcast / Independent Films
          </p>

          <h1 className={styles.title}>TEN OUT OF TEN</h1>

          <p className={styles.subTagline}>
            A cinema podcast and independent film platform spotlighting conversations, shorts, and independent films.
          </p>

          <div className={styles.actions}>
            <Link
              href={SPOTIFY_SHOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
            >
              <FaSpotify aria-hidden="true" />
              Listen on Spotify
            </Link>

            <TransitionLink href="/work" className={styles.secondaryButton}>
              Watch Our Work
              <FaArrowRight aria-hidden="true" />
            </TransitionLink>
          </div>

          <dl className={styles.stats}>
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroSpotifyWidget />
      </div>
    </section>
  );
};

export default HeroSection;
