"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import CourseModal from "./CourseModal";
import { getCourses } from "@/lib/sheets";
import TiltCard from "./TiltCard";
import SpotlightCard from "./SpotlightCard";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch((e) => console.error("Courses fetch failed:", e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section id="courses" className="relative section-pad">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 dark:border-gold-400/20 dark:bg-gold-400/5">
                <BookOpen className="h-3.5 w-3.5 text-gold-500 dark:text-gold-400" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600 dark:text-gold-300">
                  Course Catalog
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-navy-950 dark:text-white md:text-5xl lg:text-6xl">
                <SplitText>Programmes built for</SplitText>{" "}
                <span className="text-gold-gradient">
                  <SplitText delay={0.18}>every learner</SplitText>
                </span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-navy-700/80 dark:text-white/60">
                From Class 8 to 12 — for both CBSE and State Board — every course
                is curated by subject specialists with proven outcomes.
              </p>
            </div>
            <MagneticButton strength={0.28}>
              <a href="#contact" className="btn-ghost shrink-0">
                Talk to a Counsellor
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </MagneticButton>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[340px] skeleton rounded-3xl border border-gold-400/15 dark:border-gold-400/10"
                  />
                ))
              : courses.map((course, i) => {
                  const Icon = course.icon;
                  return (
                    <TiltCard
                      key={`course-${i}-${course.title || ""}`}
                      custom={i}
                      variants={cardVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className="group overflow-hidden rounded-3xl border border-gold-400/25 bg-white/55 backdrop-blur-xl transition-all duration-500 hover:border-gold-400/65 hover:shadow-[0_25px_60px_-20px_rgba(184,148,31,0.35)] dark:border-gold-400/15 dark:bg-navy-800/40 dark:hover:border-gold-400/55 dark:hover:shadow-[0_25px_60px_-20px_rgba(212,175,55,0.3)]"
                      intensity={6}
                    >
                      <SpotlightCard className="h-full w-full p-7">
                      <div className="relative">
                        <div className="mb-6 flex items-start justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/20 to-transparent transition-all duration-500 group-hover:border-gold-400/60 dark:border-gold-400/20 dark:from-gold-400/15 dark:group-hover:border-gold-400/50">
                            <Icon className="h-6 w-6 text-gold-500 dark:text-gold-400" strokeWidth={1.8} />
                          </div>
                          <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600 dark:border-gold-400/20 dark:bg-gold-400/5 dark:text-gold-300">
                            {course.badge}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold tracking-tight text-navy-950 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-navy-700/80 dark:text-white/60">
                          {course.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {course.subjects.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-navy-200 bg-navy-50/60 px-3 py-1 text-xs text-navy-700 dark:border-white/5 dark:bg-white/5 dark:text-white/70"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="mt-7 flex items-center justify-between border-t border-navy-200 pt-5 text-xs text-navy-600/80 dark:border-white/5 dark:text-white/50">
                          <span>{course.duration}</span>
                          <span>{course.students}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelected(course)}
                          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 transition-all duration-300 hover:text-gold-500 dark:text-gold-300 dark:hover:text-gold-200"
                        >
                          Learn more
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                      </SpotlightCard>
                    </TiltCard>
                  );
                })}
          </div>
        </div>
      </section>

      <CourseModal course={selected} onClose={() => setSelected(null)} />
    </>
  );
}
