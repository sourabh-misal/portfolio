"use client";
import { motion } from "framer-motion";
import styles from "./Experience.module.css";

const experiences = [
  {
    id: "hcltech",
    company: "HCLTech",
    role: "Full Stack & AI Engineer",
    period: "Oct 2023 – Present",
    location: "Bengaluru, India",
    badge: "🏆 Top Performer >9/10",
    color: "cyan",
    highlights: [
      "Delivered platforms driving a 20x return on project investment by automating pentest governance, cutting p95 DB latency by 80%, and replacing manual onboarding with event-driven SAML provisioning.",
      "Engineered enterprise cybersecurity & governance platform serving 100K+ active users on Microsoft Azure.",
      "Built automated classification systems in Python to ingest raw security reports, de-duplicate findings via vector similarity, and auto-map vulnerabilities to standardized CWE/CVE taxonomies.",
      "Modeled the full pentest governance lifecycle (Ingestion → Triage → Remediation → Verification → Sign-off) as a finite-state machine with immutable audit trails.",
      "Developed predictive analytics models analyzing historical velocity to forecast fix SLAs and automatically suggest verified patch playbooks.",
      "Eliminated concurrent write corruption using optimistic locking with version vectors.",
      "Cut p95 query latency by 80% on Azure Cosmos DB (2–4s → <400ms) via composite partition key redesign.",
      "Engineered an automated event-driven directory synchronization engine mapping Active Directory SAML groups to application roles for 1,500+ users.",
      "Secured report generation pipelines with AES-256-GCM encryption, Azure Key Vault secret rotation, and time-bound SAS URLs.",
      "Unified platform telemetry by consolidating 3+ monitoring consoles into a real-time Dynatrace APM observability dashboard.",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Python", "Azure Cosmos DB", "Azure Entra ID", "SAML 2.0", "Node.js", "Dynatrace APM"],
  },
];

const education = [
  {
    id: "iit",
    school: "Indian Institute of Technology, Tirupati",
    degree: "B.Tech in Computer Science and Engineering",
    period: "2018 – 2022",
    location: "Tirupati, India",
    icon: "🎓",
  },
];

const awards = [
  {
    id: "top-performer",
    icon: "🏆",
    title: "HCLTech Best Performing Employee",
    desc: "Awarded top performer rating (>9/10) for consistent high-impact delivery across production platforms.",
  },
  {
    id: "ml-challenge",
    icon: "⚡",
    title: "HCLTech Early Learning Challenge",
    desc: "Recognized in company-wide machine learning classification challenge during initial onboarding.",
  },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.bg}`}>
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>

          <motion.div variants={fadeUp} className="section-header">
            <span className="section-tag">05 // Where I&apos;ve Worked</span>
            <h2 className="section-title">Experience</h2>
          </motion.div>

          {/* Experience timeline */}
          <motion.div variants={fadeUp} className={styles.timeline}>
            {experiences.map((exp) => (
              <div key={exp.id} className={styles.timelineItem}>
                <div className={styles.timelineDot} aria-hidden="true">
                  <div className={styles.dot} />
                  <div className={styles.line} />
                </div>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div>
                      <h3 className={styles.company}>{exp.company}</h3>
                      <p className={styles.role}>{exp.role}</p>
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.period}>{exp.period}</span>
                      <span className={styles.location}>📍 {exp.location}</span>
                      <span className={styles.award}>{exp.badge}</span>
                    </div>
                  </div>
                  <ul className={styles.highlights}>
                    {exp.highlights.map((h) => (
                      <li key={h}>
                        <span className={styles.bullet} aria-hidden="true">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.stack}>
                    {exp.stack.map((s) => <span key={s} className={styles.stackTag}>{s}</span>)}
                  </div>
                </div>
              </div>
            ))}

            {/* Education */}
            {education.map((edu) => (
              <div key={edu.id} className={styles.timelineItem}>
                <div className={styles.timelineDot} aria-hidden="true">
                  <div className={`${styles.dot} ${styles.dotAmber}`} />
                </div>
                <div className={`${styles.card} ${styles.eduCard}`}>
                  <div className={styles.cardTop}>
                    <div>
                      <span className={styles.eduIcon}>{edu.icon}</span>
                      <h3 className={styles.company}>{edu.school}</h3>
                      <p className={styles.role}>{edu.degree}</p>
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.period}>{edu.period}</span>
                      <span className={styles.location}>📍 {edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Awards */}
          <motion.div variants={fadeUp} className={styles.awardsSection}>
            <h3 className={styles.awardsTitle}>Honors &amp; Achievements</h3>
            <div className={styles.awardsGrid}>
              {awards.map((a) => (
                <motion.div
                  key={a.id}
                  className={styles.awardCard}
                  whileHover={{ y: -4, borderColor: "rgba(0, 229, 160, 0.45)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles.awardIcon}>{a.icon}</span>
                  <div>
                    <strong>{a.title}</strong>
                    <p>{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
