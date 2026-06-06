import WorkCard from '../../components/WorkCard';
import { COMPLETED_WORKS, UPCOMING_WORKS } from '../../components/data';
import styles from './WorkPage.module.css';
import { createPageMetadata } from '../seo';

export const metadata = createPageMetadata({
  title: 'Our Work',
  description: 'Explore short films and independent films presented, distributed, produced, or promoted by Ten Out Of Ten.',
  path: '/work',
  image: '/assets/FridayPic.jpg',
  imageAlt: 'Independent films presented by Ten Out Of Ten',
});

export default function OurWorkPage() {
  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.sectionTitle}>Our Work</h1>
        <div className={styles.workGrid}>
          {COMPLETED_WORKS.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      {UPCOMING_WORKS.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Upcoming Projects</h2>
          <div className={styles.workGrid}>
            {UPCOMING_WORKS.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
