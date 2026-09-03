import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.bracket}>&lt;</span>SM<span className={styles.bracket}>/&gt;</span>
          <span className={styles.name}>Sourabh Misal</span>
        </div>
        <p className={styles.copy}>
          Built with ❤️ &amp; lots of ☕ &nbsp;·&nbsp; Deployed on{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>
        </p>
        <div className={styles.links}>
          <a href="https://github.com/sourabhmisal" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/sourabh-misal" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:sourabhmisal182@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
