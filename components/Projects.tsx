"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import styles from "./Projects.module.css";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const projects = [
  {
    id: "vuln-platform",
    category: "enterprise",
    featured: true,
    icon: "🛡️",
    title: "Vulnerability Remediation Platform",
    desc: "Led architecture & full-stack dev of an enterprise cybersecurity platform serving 100K+ users. Modeled pentest governance lifecycle (Ingestion → Triage → Remediation → Verification → Sign-off) as a finite-state machine with immutable audit-trail transitions.",
    tags: ["React.js", "Next.js", "TypeScript", "Azure Cosmos DB", "Azure Blob Storage", "Azure Entra ID"],
    metrics: ["🚀 20x Project Delivery ROI", "👥 100K+ users", "⚡ 80% latency drop", "🔐 4-tier RBAC"],
    github: "#",
    demo: "#",
  },
  {
    id: "quzzy-ai",
    category: "ai",
    featured: true,
    icon: "🤖",
    title: "Quzzy — AI Question Bank Tokenizer & Adaptive Sequencing",
    desc: "Automated NLP & regex-driven ETL pipeline parsing 100KB+ raw-text question banks into normalized JSON schemas. Powers an adaptive Next.js frontend with real-time scoring and intelligent question sequencing.",
    tags: ["Next.js", "Python", "NLP Tokenization", "Regex ETL", "Firebase"],
    metrics: ["🧠 Regex & NLP Tokenization", "⚡ Real-time scoring", "📚 100KB+ bank parsing"],
    github: "#",
    demo: "https://quzzy.vercel.app",
  },
  {
    id: "ml-classifier",
    category: "ai",
    featured: false,
    icon: "📊",
    title: "ML Data Classification Engine",
    desc: "Machine learning classification model built during HCLTech onboarding. Trained and optimized feature extraction pipelines to categorize high-dimensional datasets with top-tier precision & recall.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Feature Engineering", "ML Classification"],
    metrics: ["🎯 High-precision scoring", "📊 Multi-feature NLP"],
    github: "#",
    demo: "#",
  },
  {
    id: "ai-habit-model",
    category: "ai",
    featured: false,
    icon: "🧠",
    title: "AI Habit Analytics & Visual Tracker",
    desc: "Full-stack intelligent habit application utilizing predictive streak analytics, automated trend reporting, and persistent cloud sync. Deployed on Vercel with modern reactive state management.",
    tags: ["React.js", "Next.js", "Node.js", "Analytics", "Vercel"],
    metrics: ["📈 Predictive analytics", "🔥 Streak logging", "⚡ Production UI"],
    github: "#",
    demo: "https://ai-model-neon.vercel.app",
  },
  {
    id: "dir-sync",
    category: "enterprise",
    featured: false,
    icon: "🔄",
    title: "Directory Sync & Access Provisioning Engine",
    desc: "Replaced manual spreadsheet-and-ticket onboarding with an event-driven provisioning engine mapping AD SAML groups to app roles for 1,500+ users across multiple domains, with Zod runtime schema validation.",
    tags: ["React.js", "Next.js", "TypeScript", "Active Directory", "SAML", "Zod"],
    metrics: ["👥 1,500+ users", "🔄 Event-driven", "✅ Zero downtime rollouts"],
    github: "#",
    demo: "#",
  },
  {
    id: "settle-up",
    category: "web",
    featured: false,
    icon: "💸",
    title: "Settle Up — Smart Debt Resolution App",
    desc: "Expense-splitting web app with real-time Firestore sync, group-based debt tracking, and optimized settlement calculation — featuring Google OAuth 2.0 authentication and optimistic UI updates.",
    tags: ["React.js", "Next.js", "Firebase", "OAuth 2.0"],
    metrics: ["🔄 Real-time Firestore", "🔐 Google OAuth", "⚡ Optimistic UI"],
    github: "#",
    demo: "https://settle-up-ten-sage.vercel.app",
  },
  {
    id: "observability",
    category: "enterprise",
    featured: false,
    icon: "📊",
    title: "Platform Observability & Telemetry Dashboard",
    desc: "Consolidated 3+ monitoring consoles into a unified dashboard correlating Dynatrace APM metrics, deployment logs, and error traces. Implemented cursor-based pagination over 100K+ records.",
    tags: ["React.js", "Next.js", "TypeScript", "Dynatrace APM", "Node.js"],
    metrics: ["📉 3 consoles → 1", "🔁 Exponential backoff", "📄 100K+ records"],
    github: "#",
    demo: "#",
  },
];

const filters = ["All", "AI & ML", "Enterprise", "Web / Full Stack"] as const;
type Filter = (typeof filters)[number];

export default function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = projects.filter((p) => {
    if (active === "All") return true;
    if (active === "AI & ML") return p.category === "ai";
    if (active === "Enterprise") return p.category === "enterprise";
    if (active === "Web / Full Stack") return p.category === "web" || p.category === "personal";
    return true;
  });

  const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } } };

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="section-header">
            <span className="section-tag">03 // What I&apos;ve Built</span>
            <h2 className="section-title">Projects &amp; AI Systems</h2>
            <p className="section-subtitle">
              Enterprise cybersecurity platforms, machine learning models, and production AI applications
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} className={styles.filters} role="tablist">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                className={`${styles.filterBtn} ${active === f ? styles.activeFilter : ""}`}
                onClick={() => setActive(f)}
              >
                {f === "AI & ML" ? "🤖 AI & ML" : f === "Enterprise" ? "🏢 Enterprise" : f === "Web / Full Stack" ? "⚡ Web / Full Stack" : f}
              </button>
            ))}
          </motion.div>

          {/* Cards grid */}
          <motion.div variants={fadeUp} className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className={`${styles.card} ${p.featured ? styles.featured : ""}`}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  {p.featured && (
                    <div className={styles.featuredBadge}>
                      {p.category === "ai" ? "🤖 Featured AI Project" : "🏆 Enterprise Highlight"}
                    </div>
                  )}
                  <div className={styles.cardHeader}>
                    <span className={styles.icon}>{p.icon}</span>
                    <div className={styles.links}>
                      {p.demo !== "#" && (
                        <a href={p.demo} aria-label="Live demo" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {p.github !== "#" ? (
                        <a href={p.github} aria-label="GitHub" className={styles.iconLink} target="_blank" rel="noopener noreferrer">
                          <GithubIcon />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.desc}>{p.desc}</p>
                  <div className={styles.tags}>
                    {p.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                  <div className={styles.metrics}>
                    {p.metrics.map((m) => <span key={m}>{m}</span>)}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
