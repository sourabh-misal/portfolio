"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Skills.module.css";

const categories = [
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    pills: ["LLMs & RAG Architectures", "Prompt Engineering", "NLP & Tokenization", "Scikit-Learn", "Python (NumPy / Pandas)", "Vector Databases", "LangChain / LlamaIndex", "ML Classification"],
    featured: ["LLMs & RAG Architectures", "NLP & Tokenization", "ML Classification"],
  },
  {
    icon: "💻",
    title: "Languages",
    pills: ["TypeScript", "JavaScript (ES6+)", "Python", "SQL (PostgreSQL, MySQL)"],
    featured: ["TypeScript", "Python"],
  },
  {
    icon: "⚡",
    title: "Frontend",
    pills: ["React.js", "Next.js (App Router)", "Server Components", "HTML5", "CSS3", "Tailwind CSS", "Material UI (MUI)"],
    featured: ["React.js", "Next.js (App Router)"],
  },
  {
    icon: "🖥️",
    title: "Backend & APIs",
    pills: ["Node.js", "Express.js", "RESTful APIs", "NextAuth.js", "Zod", "Middleware Architecture"],
    featured: ["Node.js", "Express.js"],
  },
  {
    icon: "☁️",
    title: "Cloud & Databases",
    pills: ["Microsoft Azure", "Azure App Service", "Azure Blob Storage", "Azure Entra ID", "Azure Key Vault", "Cosmos DB", "PostgreSQL", "Redis", "Firebase"],
    featured: ["Microsoft Azure", "Cosmos DB"],
  },
  {
    icon: "🛠️",
    title: "DevOps & Tools",
    pills: ["Docker", "Git", "GitHub Actions", "Azure DevOps Pipelines", "Turborepo", "Jest", "Postman"],
    featured: ["Docker", "GitHub Actions"],
  },
];

const proficiencies = [
  { label: "AI & LLM Engineering / RAG", pct: 90 },
  { label: "React.js / Next.js", pct: 95 },
  { label: "TypeScript / Node.js", pct: 93 },
  { label: "Microsoft Azure Cloud", pct: 88 },
  { label: "System Design & Architecture", pct: 85 },
];

function ProfBar({ label, pct }: { label: string; pct: number }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFilled(true); }, { threshold: 0.6 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={styles.profItem} ref={ref}>
      <div className={styles.profLabel}>
        <span>{label}</span>
        <span className={styles.pct}>{pct}%</span>
      </div>
      <div className={styles.bar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={styles.fill}
          style={{ width: filled ? `${pct}%` : "0%", transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </div>
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function Skills() {
  return (
    <section id="skills" className={`section ${styles.bg}`}>
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="section-header">
            <span className="section-tag">02 // What I Know</span>
            <h2 className="section-title">Skills &amp; Tech Stack</h2>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.grid}>
            {categories.map((cat) => (
              <div key={cat.title} className={styles.category}>
                <h3 className={styles.catTitle}>
                  <span>{cat.icon}</span> {cat.title}
                </h3>
                <div className={styles.pills}>
                  {cat.pills.map((p) => (
                    <span key={p} className={`${styles.pill} ${cat.featured.includes(p) ? styles.featured : ""}`}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className={styles.profSection}>
            <h3 className={styles.profTitle}>Core Proficiency</h3>
            <div className={styles.profList}>
              {proficiencies.map((p) => <ProfBar key={p.label} {...p} />)}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
