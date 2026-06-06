import Image from 'next/image';
import styles from './GuestCard.module.css';

const GuestCard = ({ guest }) => {
  const { name, image, works } = guest;

  return (
    <article className={styles.card}>
      <div className={styles.guestHeader}>
        {image && (
          <div className={styles.avatarFrame}>
            <Image
              src={image}
              alt={`${name} portrait`}
              fill
              sizes="56px"
              className={styles.avatarImage}
            />
          </div>
        )}
        <h3 className={styles.name}>{name}</h3>
      </div>

      <div className={styles.posterGrid}>
        {works.map((work) => (
          <figure key={work.title} className={styles.posterTile}>
            <div className={styles.posterFrame}>
              <Image
                src={work.poster}
                alt={`${work.title} poster`}
                fill
                sizes="(max-width: 768px) 44vw, 180px"
                className={styles.posterImage}
              />
            </div>
            <figcaption>{work.title}</figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
};

export default GuestCard;
