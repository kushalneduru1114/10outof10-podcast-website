import TeamMemberCard from '../../components/TeamMemberCard';
import { TEAM_MEMBERS } from '../../components/data';
import styles from './TeamPage.module.css';
import { createPageMetadata } from '../seo';

export const metadata = createPageMetadata({
  title: 'Team',
  description: 'Meet the hosts, producers, designers, and collaborators behind the Ten Out Of Ten cinema podcast and film platform.',
  path: '/team',
  image: '/assets/pranav-bellary-new.jpeg',
  imageAlt: 'Ten Out Of Ten team',
});

export default function OurTeamPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Meet the Team</h1>

      <div className={styles.teamGrid}>
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
