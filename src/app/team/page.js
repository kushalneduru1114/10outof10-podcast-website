import TeamMemberCard from '../../components/TeamMemberCard';
import { TEAM_MEMBERS } from '../../components/data';
import styles from './TeamPage.module.css';

export const metadata = {
  title: 'Team | Ten Out Of Ten',
  description: 'Meet the hosts, producers, designers, and collaborators behind the Ten Out Of Ten cinema podcast and film platform.',
};

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
