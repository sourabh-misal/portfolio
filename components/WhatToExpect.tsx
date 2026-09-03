"use client";
import { motion } from "framer-motion";
import styles from "./WhatToExpect.module.css";

const items = [
  {
    num: "01",
    title: "End-to-End Ownership",
    desc: "I work across the entire stack — from stakeholder requirements and architecture design through deployment and production operations. No hand-offs, full accountability.",
    icon: "🎯",
  },
  {
    num: "02",
    title: "Enterprise-Grade Quality",
    desc: "I build for scale and correctness. Race-condition safety, 80% latency reductions, encrypted pipelines — production systems that work at 100K+ users without breaking.",
    icon: "💎",
  },
  {
    num: "03",
    title: "Clear, Proactive Communication",
    desc: "I translate technical complexity into plain language. I flag risks early, keep stakeholders in the loop, and never leave you with surprises at the finish line.",
    icon: "💬",
  },
  {
    num: "04",
    title: "First-Principles Thinking",
    desc: "I model problems before writing code. Whether it's a finite-state machine for complex workflows or composite partition keys for hot-partition skew — I design first, build second.",
    icon: "🧠",
  },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function WhatToExpect() {
  return (
    <section id="expect" className="section">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="section-header">
            <span className="section-tag">06 // The Promise</span>
            <h2 className="section-title">What You Can Expect</h2>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.grid}>
            {items.map((item) => (
              <motion.div
                key={item.num}
                className={styles.card}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,245,212,0.2)" }}
                transition={{ duration: 0.25 }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.num}>{item.num}</span>
                  <span className={styles.icon}>{item.icon}</span>
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.desc}</p>
                <div className={styles.accent} aria-hidden="true" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
