"use client";
import { motion } from "framer-motion";
import styles from "./AIFeatures.module.css";

const features = [
  {
    id: "fsm",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Finite-State Machine Architecture",
    desc: "Modeled the full pentest governance lifecycle (Ingestion → Triage → Remediation → Verification → Sign-off) as an FSM with immutable audit-trail transitions — no invalid state jumps, ever.",
    tags: ["TypeScript", "State Machines", "Audit Trails"],
  },
  {
    id: "locking",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: "Optimistic Locking & Race-Condition Safety",
    desc: "Implemented version-vector-based optimistic locking on concurrent state transitions — exactly-once progression with automatic conflict detection and retry, eliminating data corruption under parallel writes.",
    tags: ["Cosmos DB", "Version Vectors", "Concurrency"],
  },
  {
    id: "perf",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Database Performance Engineering",
    desc: "Profiled Cosmos DB RU consumption across 100K+ records. Identified hot-partition skew, redesigned partition keys to composite (projectId + status) — dropped p95 read latency from 2–4s to under 400ms (80%+ reduction).",
    tags: ["Azure Cosmos DB", "Partitioning", "RU Optimization"],
  },
  {
    id: "crypto",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Cryptographic Report Pipeline",
    desc: "Built server-side PDF generation → AES-256-GCM encryption with per-project rotating keys in Azure Key Vault → time-bound SAS URLs via Blob Storage. Zero plaintext data ever touches the wire.",
    tags: ["AES-256-GCM", "Azure Key Vault", "Blob Storage"],
  },
  {
    id: "rbac",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "4-Tier RBAC with Middleware JWT Validation",
    desc: "Designed granular access policies (Owner → Admin → Tester → Viewer) through Azure Entra ID group claims and middleware-level JWT scope validation — every action gated with full audit logging.",
    tags: ["Azure Entra ID", "JWT", "Middleware RBAC"],
  },
  {
    id: "etl",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    title: "Event-Driven Provisioning Engine",
    desc: "Replaced a manual spreadsheet-and-ticket onboarding process with an AD SAML event-driven engine serving 1,500+ users — with Zod runtime schema validation handling orphaned accounts and group membership conflicts.",
    tags: ["Active Directory", "SAML", "Zod", "Event-Driven"],
  },
  {
    id: "ai-triage",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M18 14c0 3.314-2.686 6-6 6s-6-2.686-6-6" />
        <path d="M12 20v2" /><path d="M9 22h6" />
      </svg>
    ),
    title: "AI Triage & NLP Vector Deduplication",
    desc: "Built automated NLP classification pipelines using dense vector embeddings and cosine similarity (>0.85 threshold) to de-duplicate raw scanner findings and auto-map vulnerabilities to standardized CWE/CVE taxonomies.",
    tags: ["NLP & Embeddings", "Vector Similarity", "CWE/CVE Mapping"],
  },
];

const CODE = `<span class="c"># Partition key design — 80% latency reduction</span>
<span class="c"># Before: single partition key → hot partition skew</span>
<span class="c"># After: composite key eliminates bottleneck</span>

<span class="c">// Cosmos DB container config (TypeScript)</span>
<span class="k">const</span> containerDef = {
  id: <span class="s">"findings"</span>,
  partitionKey: {
    paths: [<span class="s">"/partitionKey"</span>],  <span class="c">// composite value</span>
    kind: <span class="s">"Hash"</span>
  }
};

<span class="c">// Helper: build composite partition key</span>
<span class="k">function</span> <span class="fn">buildPartitionKey</span>(projectId: string, status: string) {
  <span class="k">return</span> <span class="s">\`\${projectId}#\${status}\`</span>;  <span class="c">// e.g. "proj-123#OPEN"</span>
}

<span class="c">// Result: p95 latency 2–4s → &lt;400ms ✅</span>`;

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function AIFeatures() {
  return (
    <section id="ai-features" className={`section ${styles.bg}`}>
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="section-header">
            <span className="section-tag">04 // Engineering Highlights</span>
            <h2 className="section-title">Hard Problems I&apos;ve Solved</h2>
            <p className="section-subtitle">
              Real engineering challenges shipped to production at HCLTech — not tutorials, not demos
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.grid}>
            {features.map((f) => (
              <motion.div
                key={f.id}
                className={styles.featureCard}
                whileHover={{ y: -5, borderColor: "rgba(0,245,212,0.4)" }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
                <div className={styles.featureTags}>
                  {f.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Code terminal */}
          <motion.div variants={fadeUp} className={styles.terminal}>
            <div className={styles.terminalHeader} aria-hidden="true">
              <span className={`${styles.dot} ${styles.red}`} />
              <span className={`${styles.dot} ${styles.yellow}`} />
              <span className={`${styles.dot} ${styles.green}`} />
              <span className={styles.filename}>cosmos_partition.ts — 80% latency fix</span>
            </div>
            <pre className={styles.terminalBody}>
              <code dangerouslySetInnerHTML={{ __html: CODE }} />
            </pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
