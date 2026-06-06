import styles from './ContactPage.module.css';

export const metadata = {
    title: 'Contact | Ten Out Of Ten',
    description: 'Contact Ten Out Of Ten for film submissions, collaborations, partnerships, and independent film presentation opportunities.',
};

export default function ContactPage() {
    const emailAddress = 'tenoutoftenfilms@gmail.com';
    const subject = 'Partnership Inquiry from 10 OUT OF 10 Website';
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
    
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Work With Us</h1>
                <p className={styles.message}>
                    Whether it is film submissions, collaborations, or partnerships, we would love to hear from you at
                </p>
                
                <a href={mailtoLink} className={styles.emailLink}>
                    {emailAddress}
                </a>
                
                <p className={styles.closing}>
                    We look forward to hearing from you.
                </p>
            </div>
        </div>
    );
}
