import Link from 'next/link';
import ApexLogo from './ApexLogo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <span className={styles.logoText}>APEX</span>
              <span className={styles.logoAccent}>METHOD</span>
            </div>
            <p className={styles.footerTagline}>
              Un corps fort. Un mental solide. Une vie maîtrisée.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4>Programmes</h4>
              <Link href="#">ORION</Link>
              <Link href="#">Papa Strong</Link>
              <Link href="#">LÉO</Link>
              <Link href="#">AMT</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Ressources</h4>
              <Link href="#">Quiz d&apos;orientation</Link>
              <Link href="#">L&apos;application</Link>
              <Link href="#">Blog</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Légal</h4>
              <Link href="#">CGV</Link>
              <Link href="#">Politique de confidentialité</Link>
              <Link href="#">Mentions légales</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2026 APEX METHOD. Tous droits réservés.</p>
          <div className={styles.footerSocials}>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6c1.72.44 8.6.44 8.6.44s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
