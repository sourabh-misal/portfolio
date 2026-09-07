"use client";
import { motion } from "framer-motion";
import styles from "./About.module.css";

const traits = [
  { icon: "🎯", title: "System Thinker", desc: "I model complex domains as finite-state machines before writing a line of code — clean architecture from day one" },
  { icon: "⚡", title: "Performance Obsessed", desc: "Cut p95 DB latency 80% at HCLTech by profiling Cosmos DB and redesigning partition keys" },
  { icon: "🔐", title: "Security-First Engineer", desc: "Built AES-256-GCM encrypted report pipelines with 4-tier RBAC and full audit logging" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="section-header">
            <span className="section-tag">01 // Who I Am</span>
            <h2 className="section-title">About Me</h2>
          </motion.div>

          <div className={styles.grid}>
            {/* Visual card */}
            <motion.div variants={fadeUp} className={styles.visual}>
              <div className={styles.cardWrapper}>
                <div className={styles.avatarCard}>
                  <div className={styles.glow} aria-hidden="true" />
                  <div className={styles.avatar}>SM</div>
                  <div className={styles.status}>
                    <span className={styles.statusDot} />
                    Online &amp; Building
                  </div>
                  <div className={styles.tags}>
                    <span>🏢 HCLTech, Bengaluru</span>
                    <span>🎓 IIT Tirupati</span>
                    <span>⚡ 3+ Years XP</span>
                    <span>🏆 Top Performer &gt;9/10</span>
                  </div>
                </div>

                <motion.div
                  className={`${styles.floatCard} ${styles.fc1}`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>🚀</span>
                  <div>
                    <strong>HCLTech</strong>
                    <p>Full Stack &amp; AI Engineer</p>
                  </div>
                </motion.div>

                <motion.div
                  className={`${styles.floatCard} ${styles.fc2}`}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span>☁️</span>
                  <div>
                    <strong>Azure Platform</strong>
                    <p>100K+ users in prod</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div variants={fadeUp} className={styles.content}>
              <p className={styles.text}>
                I&apos;m <strong>Sourabh Misal</strong> — a Full Stack &amp; AI Engineer at{" "}
                <span className="highlight">HCLTech, Bengaluru</span>, and a Computer Science graduate from{" "}
                <span className="highlight">IIT Tirupati</span>.
              </p>
              <p className={styles.text}>
                Over 3+ years at HCLTech, I&apos;ve driven enterprise platforms end-to-end serving{" "}
                <strong>100,000+ users</strong> on <strong>Microsoft Azure</strong> — building robust full-stack applications,
                designing scalable APIs, and engineering high-performance database layers that reduced p95 latency by <strong>80%</strong>.
              </p>
              <p className={styles.text}>
                I focus on building <strong>production-grade systems</strong> that are reliable, secure, and maintainable at scale.
              </p>

              <div className={styles.traits}>
                {traits.map((t) => (
                  <motion.div
                    key={t.title}
                    className={styles.trait}
                    whileHover={{ x: 6, borderColor: "rgba(0, 229, 160, 0.45)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={styles.traitIcon}>{t.icon}</span>
                    <div>
                      <strong>{t.title}</strong>
                      <p>{t.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
