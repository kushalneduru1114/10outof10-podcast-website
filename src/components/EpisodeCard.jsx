import Link from 'next/link';
import Image from 'next/image';
import { FaSpotify } from 'react-icons/fa';
import styles from './EpisodeCard.module.css';

const EpisodeCard = ({ episode }) => {
  const { title, description, url, thumbnail, thumbnailPosition } = episode;
  
  return (
    <article className={styles.card}>
      <div className={styles.contentWrapper}>
        <div className={styles.thumbnailContainer}>
          <Image
            src={thumbnail}
            alt={`${title} Thumbnail`}
            fill
            style={{ objectFit: 'cover', objectPosition: thumbnailPosition || 'center center' }}
            sizes="150px"
          />
        </div>
        
        <div className={styles.textDetails}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      
      <Link 
        href={url} 
        target="_blank"
        rel="noopener noreferrer"
        className={styles.spotifyButton}
      >
        <FaSpotify className={styles.spotifyButtonIcon} /> 
        PLAY ON SPOTIFY
      </Link>
    </article>
  );
};

export default EpisodeCard;
