"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getStats } from "@/lib/sheets";

function Counter({ to, suffix }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, to, count]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold text-navy-950 dark:text-white md:text-6xl">
      <motion.span>{rounded}</motion.span>
      <span className="text-gold-500 dark:text-gold-400">{suffix}</span>
    </span>
  );
}

export default function StatsBar() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch((e) => console.error("Stats fetch failed:", e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative section-pad">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong overflow-hidden rounded-3xl"
        >
          <div className="grid grid-cols-2 divide-y divide-gold-400/15 dark:divide-gold-400/10 md:grid-cols-4 md:divide-x md:divide-y-0">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="px-6 py-10 md:px-8 md:py-14">
                    <div className="mb-5 h-12 w-12 skeleton rounded-xl" />
                    <div className="h-12 w-24 skeleton rounded" />
                    <div className="mt-3 h-3 w-32 skeleton rounded" />
                  </div>
                ))
              : stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={`stat-${i}-${stat.label || ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.1 }}
                      className="group relative px-6 py-10 md:px-8 md:py-14"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-gold-400/0 to-gold-400/0 transition-all duration-500 group-hover:from-gold-400/5" />
                      <div className="relative">
                        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/30 bg-gold-400/15 dark:border-gold-400/20 dark:bg-gold-400/10">
                          <Icon className="h-5 w-5 text-gold-500 dark:text-gold-400" strokeWidth={2} />
                        </div>
                        <div>
                          <Counter to={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="mt-2 font-semibold text-navy-950 dark:text-white">{stat.label}</div>
                        <div className="text-sm text-navy-600/80 dark:text-white/50">{stat.subtitle}</div>
                      </div>
                    </motion.div>
                  );
                })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
