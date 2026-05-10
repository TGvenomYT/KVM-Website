"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Mail, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { getFaculty } from "@/lib/sheets";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaculty()
      .then(setFaculty)
      .catch((e) => console.error("Faculty fetch failed:", e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="faculty" className="relative section-pad">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/[0.04] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl text-center mx-auto"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 dark:border-gold-400/20 dark:bg-gold-400/5">
            <GraduationCap className="h-3.5 w-3.5 text-gold-500 dark:text-gold-400" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600 dark:text-gold-300">
              The Faculty
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-navy-950 dark:text-white md:text-5xl lg:text-6xl">
            Mentors who{" "}
            <span className="text-gold-gradient">make the difference</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-700/80 dark:text-white/60">
            Decades of teaching wisdom meet contemporary pedagogy. Our faculty
            blend rigour with empathy — and it shows in every result.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-32 w-32 animate-pulse rounded-full bg-gold-400/10 md:h-36 md:w-36" />
                  <div className="mt-6 h-3 w-20 animate-pulse rounded bg-gold-400/10" />
                  <div className="mt-2 h-2 w-16 animate-pulse rounded bg-gold-400/10" />
                </div>
              ))
            : faculty.map((member, i) => (
                <motion.div
                  key={`faculty-${i}-${member.name || ""}`}
                  custom={i}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative">
                    <div className="absolute -inset-1.5 rounded-full bg-gold-gradient opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70" />
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gold-400/30 transition-all duration-500 group-hover:border-gold-400/70 dark:border-gold-400/20 dark:group-hover:border-gold-400/60 md:h-36 md:w-36">
                      {member.img && (
                        <Image
                          src={member.img}
                          alt={member.name}
                          fill
                          sizes="144px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-gold-400/40 bg-cream-50 px-2.5 py-0.5 text-[10px] font-semibold text-gold-600 dark:border-gold-400/30 dark:bg-navy-900 dark:text-gold-300">
                      {member.experience}
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-base font-bold tracking-tight text-navy-950 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-gold-600 dark:text-gold-300">
                    {member.role}
                  </p>
                  <p className="mt-1 text-xs text-navy-600/80 dark:text-white/50">{member.qualification}</p>

                  <div className="mt-4 flex gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <a className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/30 text-gold-600 hover:bg-gold-400/10 dark:border-gold-400/20 dark:text-gold-300" aria-label="Linkedin" href="#">
                      <Linkedin className="h-3 w-3" />
                    </a>
                    <a className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/30 text-gold-600 hover:bg-gold-400/10 dark:border-gold-400/20 dark:text-gold-300" aria-label="Twitter" href="#">
                      <Twitter className="h-3 w-3" />
                    </a>
                    <a className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/30 text-gold-600 hover:bg-gold-400/10 dark:border-gold-400/20 dark:text-gold-300" aria-label="Email" href="#">
                      <Mail className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
