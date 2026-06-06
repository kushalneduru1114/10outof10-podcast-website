import Image from 'next/image';
import Link from 'next/link';
import styles from './WorkCard.module.css';

const WorkCard = ({ work, priority = false }) => {
  const { title, type, year, role, description, link, image, thumbnailPosition } = work;
  const isExternalLink = link?.startsWith('http');

  const content = (
    <>
      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={`${title} artwork`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: thumbnailPosition || 'center center' }}
            className={styles.workImage}
            priority={priority}
          />
        </div>
      )}

      <div className={styles.textContent}>
        <p className={styles.subInfo}>
          {[type, year].filter(Boolean).join(' / ')}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.role}>{role}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </>
  );

  if (!link) {
    return <article className={styles.card}>{content}</article>;
  }

  return (
    <Link
      href={link}
      className={`${styles.card} ${styles.cardLink}`}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      aria-label={`Watch ${title}`}
    >
      {content}
    </Link>
  );
};

export default WorkCard;
