"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";

const ROLES = [
  "Full Stack & AI Engineer",
  "Cloud & Distributed Systems Architect",
  "NLP & Vulnerability Pipeline Lead",
  "High-Performance Systems Engineer",
  "IIT Tirupati CSE Graduate",
];

const STATS = [
  { target: 20, label: "Project ROI", suffix: "x" },
  { target: 3, label: "Years Experience", suffix: "+" },
  { target: 100, label: "Users Served", suffix: "K+" },
  { target: 80, label: "Latency Reduced", suffix: "%" },
];

function useTyped(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, typing, wordIdx, words, speed, pause]);

  return display;
}

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatItem({ target, label, suffix }: { target: number; label: string; suffix: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const count = useCountUp(target, 2000, started);
  return (
    <div className={styles.statItem} ref={ref}>
      <span className={styles.statNum}>
        {count}
        <span className={styles.statSuffix}>{suffix}</span>
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function Hero() {
  const typed = useTyped(ROLES);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

  return (
    <section id="home" className={styles.hero}>
      {/* Animated gradient mesh background */}
      <div className={styles.meshBg} aria-hidden="true">
        <div className={styles.meshOrb1} />
        <div className={styles.meshOrb2} />
        <div className={styles.meshOrb3} />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item} className={styles.badge}>
            <span className={styles.badgeDot} />
            🌍 Open to Work · Worldwide
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} className={styles.name}>
            <span className={styles.greeting}>Hello, I&apos;m</span>
            <span className={styles.nameText}>Sourabh Misal</span>
          </motion.h1>

          {/* Role typewriter */}
          <motion.p variants={item} className={styles.role}>
            <span className={styles.rolePrefix}>I am a </span>
            <span className={styles.typed}>{typed}</span>
            <span className={styles.cursor} aria-hidden="true">|</span>
          </motion.p>

          {/* Description */}
          <motion.p variants={item} className={styles.description}>
            Full Stack & AI Engineer at <span className="highlight">HCLTech</span>. Building enterprise platforms with a{" "}
            <span className="highlight">20x return on project delivery</span> — scalable distributed systems, cloud architectures on Azure, and modern React/Next.js frontends. IIT Tirupati CSE Graduate.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className={styles.actions}>
            <a href="#projects" className="btn btn-primary">
              View Work &amp; Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get In Touch
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className={styles.stats}>
            {STATS.map((s) => (
              <StatItem key={s.label} target={s.target} label={s.label} suffix={s.suffix} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.scrollHint} aria-label="Scroll down">
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <ChevronDown size={16} className={styles.chevron} />
      </div>
    </section>
  );
}
