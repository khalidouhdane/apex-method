import Link from 'next/link';
import Image from 'next/image';
import FooterLogo from './FooterLogo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.topRow}>
          <div className={styles.appAndSocials}>
            <Image
              src="/images/footer/app-download.svg"
              alt="App Download"
              width={149}
              height={100}
              className={styles.appDownload}
            />
            <div className={styles.socials}>
              <span className={styles.followUs}>Follow us on :</span>
              <Image
                src="/images/footer/social-icons.svg"
                alt="Social Icons"
                width={193}
                height={24}
                className={styles.socialIcons}
              />
            </div>
          </div>
          
          <div className={styles.links}>
            <div className={styles.listing}>
              <h4 className={styles.listingTitle}>Offres</h4>
              <div className={styles.items}>
                <Link href="#">Programme Orion Maison</Link>
                <Link href="#">Programme Orion Salle</Link>
                <Link href="#">Programme Leo</Link>
                <Link href="#">Programme Athena</Link>
                <Link href="#">Papa Strong</Link>
                <Link href="#">Apex Method Training</Link>
              </div>
            </div>
            <div className={styles.listing}>
              <h4 className={styles.listingTitle}>Ressources</h4>
              <div className={styles.items}>
                <Link href="#">Quiz D&apos;orientation</Link>
                <Link href="#">L&apos;Application</Link>
                <Link href="#">Blogs</Link>
              </div>
            </div>
            <div className={styles.listing}>
              <h4 className={styles.listingTitle}>Legal</h4>
              <div className={styles.items}>
                <Link href="#">CGV</Link>
                <Link href="#">Politique de confidentialité</Link>
                <Link href="#">Mentions Légales</Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <FooterLogo className={styles.apexLogo} />
          <div className={styles.bottomLine}>
            <p className={styles.copyright}>© 2026 APEX METHOD. Tous droits réservés.</p>
            <div className={styles.tagline}>
              <div className={styles.taglineSegment}>
                <span className={styles.taglineBold}>UN CORPS</span>
                <span className={styles.taglineLight}> FORT</span>
              </div>
              <div className={styles.taglineSegment}>
                <span className={styles.taglineBold}>UN MENTAL</span>
                <span className={styles.taglineLightAlt}> SOLIDE</span>
              </div>
              <div className={styles.taglineSegment}>
                <span className={styles.taglineBold}>UNE VIE</span>
                <span className={styles.taglineLightAlt}> MAÎTRISÉE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
