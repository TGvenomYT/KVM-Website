"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { getToppers } from "@/lib/sheets";
import TiltCard from "./TiltCard";
import SplitText from "./SplitText";

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HallOfFame() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeClass, setActiveClass] = useState(null);

  useEffect(() => {
    getToppers()
      .then((data) => {
        setToppers(data);
        const firstClass = data.find((t) => t.class)?.class || null;
        setActiveClass(firstClass);
      })
      .catch((e) => console.error("Toppers fetch failed:", e))
      .finally(() => setLoading(false));
  }, []);

  const classes = Array.from(
    new Set(toppers.map((t) => t.class).filter(Boolean))
  );
  const filteredToppers = activeClass
    ? toppers.filter((t) => t.class === activeClass)
    : toppers;

  return (
    <section id="hall-of-fame" className="relative section-pad">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 dark:border-gold-400/20 dark:bg-gold-400/5">
            <Trophy className="h-3.5 w-3.5 text-gold-500 dark:text-gold-400" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600 dark:text-gold-300">
              Hall of Fame
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-navy-950 dark:text-white md:text-5xl lg:text-6xl">
            <SplitText>Our</SplitText>{" "}
            <span className="text-gold-gradient">
              <SplitText delay={0.08}>Distinguished</SplitText>
            </span>{" "}
            <SplitText delay={0.2}>Achievers</SplitText>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-700/80 dark:text-white/60">
            A celebration of disciplined effort, expert mentorship, and rigorous
            preparation — students whose results reflect the standard KVMTCC
            stands for.
          </p>
        </motion.div>

        {!loading && classes.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex justify-start"
          >
            <div className="relative inline-flex items-center gap-1 rounded-full border border-navy-200/60 bg-white/50 p-1.5 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]">
              {classes.map((cls) => {
                const isActive = cls === activeClass;
                return (
                  <button
                    key={cls}
                    onClick={() => setActiveClass(cls)}
                    className="relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="hof-tab-pill"
                        className="absolute inset-0 rounded-full bg-gold-gradient shadow-lg shadow-gold-400/40"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <GraduationCap
                      className={`relative h-4 w-4 transition-colors duration-300 ${
                        isActive
                          ? "text-navy-950"
                          : "text-navy-500 dark:text-white/50"
                      }`}
                      strokeWidth={2.2}
                    />
                    <span
                      className={`relative transition-colors duration-300 ${
                        isActive
                          ? "text-navy-950"
                          : "text-navy-700 hover:text-gold-600 dark:text-white/70 dark:hover:text-gold-300"
                      }`}
                    >
                      {cls}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        <div
          key={activeClass || "all"}
          className="grid auto-rows-[minmax(220px,_auto)] grid-cols-1 gap-5 md:auto-rows-[minmax(160px,_auto)] md:grid-cols-4"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`bento-card skeleton ${
                    i === 0 ? "row-span-2 md:col-span-2 md:row-span-2" : ""
                  } ${i === 1 || i === 4 ? "md:col-span-2" : ""}`}
                />
              ))
            : filteredToppers.map((topper, i) => {
                const Icon = topper.icon;
                return (
                  <TiltCard
                    key={`topper-${i}-${topper.name || ""}`}
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className={`bento-card group ${topper.span} ${topper.featured ? "bento-card-featured" : ""}`}
                    intensity={5}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                      {topper.img && (
                        <Image
                          src={topper.img}
                          alt={topper.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${topper.featured ? "object-top" : "object-[center_20%]"}`}
                          unoptimized
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/10" />

                      <div className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shadow-lg shadow-gold-400/30">
                        <Icon className="h-5 w-5 text-navy-950" strokeWidth={2.4} />
                      </div>

                      {topper.featured && (
                        <div className="absolute right-5 top-5 z-10 rounded-full border border-gold-400/40 bg-navy-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-300 backdrop-blur">
                          Hall of Famer
                        </div>
                      )}

                      <div className="absolute inset-x-5 bottom-5 z-10">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                          {topper.grade}
                        </div>
                        <h3
                          className={`mt-1 font-display font-bold text-white ${
                            topper.featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                          }`}
                        >
                          {topper.name}
                        </h3>
                        <div className="mt-2 flex items-end justify-between gap-3">
                          <p className="text-sm text-white/60">{topper.subject}</p>
                          <div className="text-right">
                            <div className="font-display text-2xl font-bold text-gold-gradient md:text-3xl">
                              {topper.marks}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
        </div>
      </div>
    </section>
  );
}
