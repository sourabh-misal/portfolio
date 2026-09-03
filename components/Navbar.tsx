"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#ai-features", label: "Highlights" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    setActive(href);
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#home" className={styles.logo} aria-label="Home">
          <span className={styles.bracket}>&lt;</span>
          S
          <span className={styles.bracket}>/&gt;</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`${styles.link} ${active === l.href ? styles.linkActive : ""}`}
                onClick={() => handleNav(l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={styles.cta} onClick={() => handleNav("#contact")}>
              Hire Me
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={styles.mobileLink}
                onClick={() => handleNav(l.href)}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className={`${styles.cta} ${styles.mobileCta}`} onClick={() => handleNav("#contact")}>
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
