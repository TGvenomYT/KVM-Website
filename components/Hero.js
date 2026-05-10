"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden pt-32 md:pt-40"
    >
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-gold-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-navy-200/40 blur-[140px] dark:bg-navy-500/30" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-24 md:px-12 lg:grid-cols-2 lg:gap-12 lg:pb-40">
        <div className="relative z-10">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-navy-950 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Shaping{" "}
            <span className="relative inline-block">
              <span className="text-shimmer">Future</span>
            </span>{" "}
            <br className="hidden md:block" />
            <span className="text-gold-gradient">Toppers</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed text-navy-700/80 dark:text-white/65 md:text-xl"
          >
            Where passionate educators meet ambitious students. KVMTCC delivers
            personalised, results-driven coaching for CBSE & State Board
            students from Class 8 to 12 — engineered for academic excellence.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <a href="#courses" className="btn-primary group justify-center">
              Explore Courses
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#hall-of-fame" className="btn-ghost justify-center">
              View Toppers
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="mt-12 flex items-center gap-4 sm:gap-6"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=80&h=80&fit=crop&q=80",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80",
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&q=80",
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&q=80",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-cream-100 ring-1 ring-gold-400/30 dark:border-navy-900"
                >
                  <Image
                    src={src}
                    alt={`Student ${i + 1}`}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
                <span className="ml-2 text-sm font-semibold text-navy-950 dark:text-white">4.9</span>
              </div>
              <p className="text-xs text-navy-600/70 dark:text-white/50">From 200+ parent reviews</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-gold-400/25 dark:border-gold-400/15">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85"
              alt="Students studying"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-cream-100/40 to-transparent dark:from-navy-950 dark:via-navy-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-cream-100/40 via-transparent to-transparent dark:from-navy-950/40" />
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong absolute -left-6 top-12 rounded-2xl px-5 py-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
                <Star className="h-5 w-5 fill-navy-950 text-navy-950" />
              </div>
              <div>
                <div className="text-xl font-bold text-navy-950 dark:text-white">98%</div>
                <div className="text-[11px] uppercase tracking-wider text-navy-600 dark:text-white/60">
                  Success Rate
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass-strong absolute -right-4 bottom-16 rounded-2xl px-5 py-4 shadow-2xl"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-gold-600 dark:text-gold-300">
              Top Score 2025
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-navy-950 dark:text-white">
              495<span className="text-gold-500 dark:text-gold-400">/500</span>
            </div>
            <div className="text-[11px] text-navy-600 dark:text-white/50">CBSE Class 12 Topper</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
