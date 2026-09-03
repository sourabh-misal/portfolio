"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";

const ROLES = [
  "AI & Full Stack Developer",
  "LLM & RAG Systems Engineer",
  "Senior Full Stack Engineer",
  "Azure Cloud Architect",
  "Machine Learning Developer",
];

const STATS = [
  { target: 20, label: "Project Delivery ROI", suffix: "x" },
  { target: 3, label: "Years Experience", suffix: "+" },
  { target: 100, label: "Users Served (K+)", suffix: "K+" },
  { target: 80, label: "DB Latency Reduced", suffix: "%" },
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
        <span className={styles.plus}>{suffix}</span>
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function Hero() {
  const typed = useTyped(ROLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ["#00f5d4", "#39ff14", "#00c9ad"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#00f5d4";
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroBg} />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item} className={styles.badge}>
            <span className={styles.badgeDot} />
            🇮🇳 Open to Work · Anywhere in India
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} className={styles.name}>
            <span className={styles.greeting}>Hello, I&apos;m</span>
            <span className={styles.nameText}>Sourabh Misal</span>
          </motion.h1>

          {/* Role typewriter */}
          <motion.p variants={item} className={styles.role}>
            <span className={styles.rolePrefix}>I&apos;m an </span>
            <span className={styles.typed}>{typed}</span>
            <span className={styles.cursor} aria-hidden="true">|</span>
          </motion.p>

          {/* Description */}
          <motion.p variants={item} className={styles.description}>
            AI &amp; Senior Full Stack Developer at <span className="highlight">HCLTech</span>. Delivered enterprise platforms with a{" "}
            <span className="highlight">20x return on project delivery</span> — combining intelligent AI systems, fine-tuned ML models, and scalable cloud solutions on Azure &amp; Vercel. IIT Tirupati CSE Graduate.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className={styles.actions}>
            <a href="#projects" className="btn btn-primary">
              View Work &amp; 20x ROI Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get In Touch
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className={styles.stats}>
            {STATS.map((s, i) => (
              <div key={s.label} className={styles.statGroup}>
                <StatItem target={s.target} label={s.label} suffix={s.suffix} />
                {i < STATS.length - 1 && <div className={styles.divider} aria-hidden="true" />}
              </div>
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
