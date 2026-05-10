"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getTestimonials } from "@/lib/sheets";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    getTestimonials()
      .then(setTestimonials)
      .catch((e) => console.error("Testimonials fetch failed:", e))
      .finally(() => setLoading(false));
  }, []);

  const paginate = (dir) => {
    if (testimonials.length === 0) return;
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => paginate(1), 6500);
    return () => clearInterval(t);
  }, [index, testimonials.length]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="relative section-pad">
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-gold-400/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-navy-200/40 blur-3xl dark:bg-navy-500/30" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 dark:border-gold-400/20 dark:bg-gold-400/5">
            <Quote className="h-3.5 w-3.5 text-gold-500 dark:text-gold-400" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600 dark:text-gold-300">
              Parent Voices
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-navy-950 dark:text-white md:text-5xl lg:text-6xl">
            What <span className="text-gold-gradient">parents</span> say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-8 md:p-14">
            <Quote className="absolute right-8 top-8 h-24 w-24 text-gold-400/15 dark:text-gold-400/10 md:h-32 md:w-32" />

            <div className="relative min-h-[280px] md:min-h-[260px]">
              {loading || !t ? (
                <div className="space-y-4">
                  <div className="h-4 w-32 animate-pulse rounded bg-gold-400/10" />
                  <div className="h-8 w-full animate-pulse rounded bg-gold-400/10" />
                  <div className="h-8 w-3/4 animate-pulse rounded bg-gold-400/10" />
                  <div className="h-8 w-2/3 animate-pulse rounded bg-gold-400/10" />
                </div>
              ) : (
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 60 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-5 flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                    <p className="font-display text-2xl leading-snug text-navy-950 dark:text-white md:text-3xl lg:text-[34px] lg:leading-[1.3]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-9 flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gold-400/40 dark:border-gold-400/30">
                        {t.img && (
                          <Image
                            src={t.img}
                            alt={t.author}
                            fill
                            sizes="56px"
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-navy-950 dark:text-white">{t.author}</div>
                        <div className="text-sm text-gold-600 dark:text-gold-300">{t.relation}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {!loading && testimonials.length > 0 && (
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index
                        ? "w-10 bg-gold-500 dark:bg-gold-400"
                        : "w-5 bg-navy-300 hover:bg-navy-400 dark:bg-white/20 dark:hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => paginate(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/30 text-gold-600 transition-all duration-300 hover:border-gold-400/70 hover:bg-gold-400/10 dark:border-gold-400/20 dark:text-gold-300 dark:hover:border-gold-400/60"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/30 text-gold-600 transition-all duration-300 hover:border-gold-400/70 hover:bg-gold-400/10 dark:border-gold-400/20 dark:text-gold-300 dark:hover:border-gold-400/60"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
