import WorkCard from '../../components/WorkCard';
import { COMPLETED_WORKS, UPCOMING_WORKS } from '../../components/data';
import styles from './WorkPage.module.css';

export const metadata = {
  title: 'Our Work | Ten Out Of Ten',
  description: 'Explore short films and independent films presented, distributed, produced, or promoted by Ten Out Of Ten.',
};

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
