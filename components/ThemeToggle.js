"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("dark");
  const [rippling, setRippling] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("kvmtcc-theme");
    const initial =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const root = document.documentElement;
    if (initial === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    setTheme(initial);
  }, []);

  const applyTheme = (t) => {
    const root = document.documentElement;
    if (t === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("kvmtcc-theme", t);
    setTheme(t);
  };

  const toggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    // Ring ripples on button
    setRippling(true);
    setTimeout(() => setRippling(false), 700);

    // Anchor the reveal origin to the button center
    const rect = btnRef.current?.getBoundingClientRect();
    const ox = rect ? Math.round(rect.left + rect.width / 2) : window.innerWidth - 48;
    const oy = rect ? Math.round(rect.top + rect.height / 2) : 48;
    document.documentElement.style.setProperty("--theme-x", `${ox}px`);
    document.documentElement.style.setProperty("--theme-y", `${oy}px`);

    if (!document.startViewTransition) {
      applyTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => applyTheme(nextTheme));
  };

  const isDark = theme === "dark";

  return (
    <div className={`relative inline-flex ${className}`}>
      <AnimatePresence>
        {rippling && (
          <>
            <motion.span
              key="ring1"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.6, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 rounded-full border border-gold-400/70"
            />
            <motion.span
              key="ring2"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 3.6, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
              className="pointer-events-none absolute inset-0 rounded-full border border-gold-400/35"
            />
          </>
        )}
      </AnimatePresence>

      <button
        ref={btnRef}
        onClick={toggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gold-400/30 bg-white/5 text-gold-500 transition-all duration-300 hover:border-gold-400/60 hover:bg-gold-400/10 dark:text-gold-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.35, 0.88, 1.08, 1],
              opacity: [0, 1, 1, 1, 1],
            }}
            exit={{ scale: 2.2, opacity: 0 }}
            transition={{
              duration: 0.48,
              ease: "easeOut",
              times: [0, 0.38, 0.58, 0.78, 1],
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
