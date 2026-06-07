import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import styles from './TeamMemberCard.module.css';

const TeamMemberCard = ({ member }) => {
  const { firstName, lastName, position, tenure, image, instagram } = member;
  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const nameClassName = member.id === 'tm7' ? `${styles.name} ${styles.compactName}` : styles.name;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={fullName}
          fill
          priority={member.id === 'tm7'}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 50vw, 33vw"
          className={styles.memberImage}
        />
      </div>
      <div className={styles.infoWrapper}>
        <h4 className={styles.position}>{position}</h4>
        <h3 className={nameClassName}>{fullName}</h3>
        <p className={styles.tenure}>{tenure}</p>

        {instagram && (
          <Link
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramButton}
            aria-label={`Visit ${fullName}'s Instagram profile`}
          >
            <FaInstagram size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
