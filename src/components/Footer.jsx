import Link from 'next/link';
import { FaApple, FaInstagram, FaPodcast, FaSpotify } from 'react-icons/fa';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
    { name: 'Spotify', icon: FaSpotify, href: 'https://open.spotify.com/show/1K9g6ClNj9TIK1CuAs5aOc?si=jppXn7UFQkemWFuGvJu6Dg' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/tenoutoftenfilms?igsh=dGJtbjh3cTR0dHN4' },
    { name: 'Apple Podcasts', icon: FaApple, href: 'https://podcasts.apple.com/us/podcast/ten-out-of-ten/id1564755200' },
    { name: 'Gaana', icon: FaPodcast, href: 'https://gaana.com/podcast/ten-out-of-ten-season-1' },
];

const Footer = () => {
    return (
        <footer id="contact" className={styles.footer}>
            <div className={styles.contentWrapper}>
                <div className={styles.mainLayout}>
                    <div className={styles.listenSection}>
                        <h3>Listen & Connect</h3>
                        <div className={styles.socialLinks}>
                            {SOCIAL_LINKS.map((link) => (
                                <Link key={link.name} href={link.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                                    <link.icon size={24} />
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Ten Out Of Ten. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
