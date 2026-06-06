import EpisodeCard from '../components/EpisodeCard';
import GuestCard from '../components/GuestCard';
import HeroSection from '../components/HeroSection';
import { ABOUT_TEXT, EPISODES, GUESTS } from '../components/data';
import styles from './HomePage.module.css';

export const metadata = {
  title: 'Ten Out Of Ten | Cinema Podcast & Independent Films',
  description: 'Ten Out Of Ten is a cinema podcast and independent film platform spotlighting conversations, short films, independent films, and Telugu cinema voices.',
};

export default function Home() {
  const featuredEpisodes = EPISODES.filter((episode) => episode.isPopular || episode.isLatest);

  return (
    <div className={styles.page}>
      <HeroSection />

      <main>
        <section className={styles.aboutBand} aria-labelledby="about-title">
          <div className={styles.aboutInner}>
            <div className={styles.aboutCopy}>
              <p className={styles.kicker}>About Ten Out Of Ten</p>
              <p>{ABOUT_TEXT}</p>
            </div>
            <h2 id="about-title">Cinema conversations with a home for independent films.</h2>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="episodes-title">
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Start Here</p>
            <h2 id="episodes-title">Featured Episodes</h2>
          </div>
          <div className={styles.cardGrid}>
            {featuredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="guests-title">
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Prominent Guests</p>
            <h2 id="guests-title">Filmmakers and their work</h2>
          </div>
          <div className={styles.guestList}>
            {GUESTS.map((guest) => (
              <GuestCard key={guest.id} guest={guest} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
