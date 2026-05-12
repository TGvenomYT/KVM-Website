"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import { asset } from "@/lib/paths";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Hall of Fame", href: "#hall-of-fame" },
  { label: "Courses", href: "#courses" },
  { label: "Faculty", href: "#faculty" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    const onScroll = () => {
      const offset = 120;
      let current = "home";
      for (const { href } of navLinks) {
        const el = document.getElementById(href.slice(1));
        if (el && el.getBoundingClientRect().top <= offset) current = href.slice(1);
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-400/15 bg-cream-100/80 backdrop-blur-xl dark:border-gold-400/10 dark:bg-navy-950/70"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <a href="#home" className="flex items-center gap-3" aria-label="KVMTCC home">
          <div className="relative flex h-12 w-auto items-center rounded-lg bg-white/95 px-2 py-1 shadow-sm ring-1 ring-gold-400/20 backdrop-blur-sm transition-all duration-300 hover:ring-gold-400/50 dark:bg-cream-50/95">
            <Image
              src={asset("/logo.png")}
              alt="KVM Creating Successful Minds"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
          <div className="hidden leading-tight sm:block">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">
              Tuition Centre
            </div>
          </div>
        </a>

        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gold-400/10 hover:text-gold-600 dark:hover:text-gold-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-gold-600 dark:text-gold-300"
                    : "text-navy-700/80 dark:text-white/70"
                }`}
              >
                {link.label}
                {/* active dot */}
                <motion.span
                  animate={{
                    scale: activeSection === link.href.slice(1) ? 1 : 0,
                    opacity: activeSection === link.href.slice(1) ? 1 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold-500 dark:bg-gold-400"
                />
                {/* hover underline for non-active */}
                {activeSection !== link.href.slice(1) && (
                  <span className="absolute inset-x-4 bottom-[7px] h-px origin-left scale-x-0 rounded-full bg-current opacity-60 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MagneticButton>
            <a href="#contact" className="btn-primary hidden lg:inline-flex">
              Enroll Now
            </a>
          </MagneticButton>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-gold-400/30 p-2 text-gold-600 dark:text-gold-300 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-gold-400/15 bg-cream-100/95 px-6 py-6 backdrop-blur-xl dark:border-gold-400/10 dark:bg-navy-950/95 lg:hidden"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-navy-800 hover:bg-gold-400/10 hover:text-gold-600 dark:text-white/80 dark:hover:text-gold-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a href="#contact" className="btn-primary w-full" onClick={() => setOpen(false)}>
                Enroll Now
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
