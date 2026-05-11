"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { X, Users, Clock, Sparkles, ArrowRight } from "lucide-react";

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const ITEM = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function CourseModal({ course, onClose }) {
  useEffect(() => {
    if (!course) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [course, onClose]);

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-navy-950/70 backdrop-blur-md"
          onClick={onClose}
        >
          <div className="flex min-h-full items-start justify-center px-4 py-8 md:items-center md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-gold-400/25 bg-cream-50 shadow-2xl shadow-navy-950/20 dark:border-gold-400/15 dark:bg-navy-900"
          >
            <CourseHero course={course} onClose={onClose} />
            <CourseFaculty staff={course.staff} />
            <CourseCta onClose={onClose} />
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CourseHero({ course, onClose }) {
  const Icon = course.icon || Sparkles;
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-gold-50/50 to-cream-200/40 dark:from-navy-800 dark:via-navy-900 dark:to-navy-800" />
      <div className="absolute inset-0 grid-bg opacity-50 dark:opacity-30" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-300/40 blur-3xl dark:bg-gold-400/15" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-gold-200/30 blur-3xl dark:bg-gold-400/10" />

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/30 bg-white/80 text-navy-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:border-gold-400/70 hover:bg-gold-400/15 dark:border-gold-400/20 dark:bg-navy-950/60 dark:text-gold-200"
      >
        <X className="h-4 w-4" strokeWidth={2.4} />
      </button>

      <motion.div
        variants={STAGGER}
        initial="hidden"
        animate="show"
        className="relative px-7 pt-12 pb-10 md:px-14 md:pt-16 md:pb-12"
      >
        <motion.div variants={ITEM} className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient shadow-lg shadow-gold-400/40">
            <Icon className="h-6 w-6 text-navy-950" strokeWidth={2} />
          </div>
          <span className="rounded-full border border-gold-400/40 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-700 backdrop-blur dark:border-gold-400/25 dark:bg-navy-950/40 dark:text-gold-300">
            {course.badge}
          </span>
        </motion.div>

        <motion.h3
          variants={ITEM}
          className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-navy-950 dark:text-white md:text-5xl"
        >
          {course.title}
        </motion.h3>

        <motion.p
          variants={ITEM}
          className="mt-4 max-w-2xl text-base leading-relaxed text-navy-700/85 dark:text-white/70 md:text-lg"
        >
          {course.description}
        </motion.p>

        <motion.div variants={ITEM} className="mt-7 flex flex-wrap items-center gap-3">
          <HeroChip icon={Clock} label={course.duration} />
          <HeroChip icon={Users} label={course.students} />
          {course.subjects?.length > 0 && (
            <span className="text-xs text-navy-500 dark:text-white/40">
              · {course.subjects.length} {course.subjects.length === 1 ? "subject" : "subjects"}
            </span>
          )}
        </motion.div>

        {course.subjects?.length > 0 && (
          <motion.div variants={ITEM} className="mt-5 flex flex-wrap gap-2">
            {course.subjects.map((s) => (
              <span
                key={s}
                className="rounded-full border border-gold-400/25 bg-white/55 px-3 py-1 text-xs font-medium text-navy-700 backdrop-blur dark:border-gold-400/15 dark:bg-white/5 dark:text-white/75"
              >
                {s}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function HeroChip({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-white/65 px-3 py-1.5 text-xs font-medium text-navy-800 backdrop-blur-md dark:border-gold-400/20 dark:bg-navy-950/40 dark:text-white/80">
      <Icon className="h-3.5 w-3.5 text-gold-500 dark:text-gold-400" />
      {label}
    </span>
  );
}

function CourseFaculty({ staff }) {
  if (!staff?.length) return null;

  return (
    <section className="relative border-t border-gold-400/10 px-6 py-12 md:px-12 md:py-14 dark:border-gold-400/8">
      <SectionHeader
        eyebrow="The Mentors"
        title="Faculty for this Course"
        subtitle="Specialists chosen specifically for this programme"
        icon={Users}
      />

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {staff.map((person, i) => (
          <motion.div
            key={person.name + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-gold-400/20 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/55 hover:shadow-2xl hover:shadow-gold-400/15 dark:border-gold-400/12 dark:bg-navy-800/40 dark:hover:border-gold-400/40"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              {person.img ? (
                <Image
                  src={person.img}
                  alt={person.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold-100 to-cream-200 dark:from-navy-700 dark:to-navy-800">
                  <Users className="h-10 w-10 text-gold-400/50" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/0 to-navy-950/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute right-3 top-3 rounded-full border border-gold-400/40 bg-navy-950/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
                {person.subject}
              </div>

              <div className="absolute inset-x-4 bottom-4">
                <h4 className="font-display text-base font-bold leading-tight text-white">
                  {person.name}
                </h4>
                <p className="mt-0.5 text-[11px] text-white/65">{person.qualification}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CourseCta({ onClose }) {
  return (
    <section className="relative overflow-hidden border-t border-gold-400/10 px-6 py-10 md:px-12 md:py-12 dark:border-gold-400/8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/5 to-transparent" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-gold-400/15 blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">
            <Sparkles className="h-3 w-3" />
            Next step
          </div>
          <h4 className="mt-2 font-display text-xl font-bold leading-snug text-navy-950 dark:text-white md:text-2xl">
            Ready to enrol or want to talk to an advisor?
          </h4>
        </div>
        <a href="#contact" className="btn-primary group" onClick={onClose}>
          Book Free Counselling
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">
        {Icon && <Icon className="h-3 w-3" />}
        {eyebrow}
      </div>
      <h4 className="font-display text-2xl font-bold leading-tight tracking-tight text-navy-950 dark:text-white md:text-3xl">
        {title}
      </h4>
      {subtitle && (
        <p className="text-sm text-navy-600/80 dark:text-white/55">{subtitle}</p>
      )}
    </div>
  );
}
