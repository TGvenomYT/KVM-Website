"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Linkedin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { asset } from "@/lib/paths";

const links = {
  Programmes: ["Class 12 CBSE", "Class 11 CBSE", "Class 10", "Class 9", "Class 8", "State Board"],
  Centre: ["About Us", "Faculty", "Hall of Fame", "Testimonials", "Gallery"],
  Resources: ["Study Material", "Mock Tests", "Past Papers", "Blog", "FAQ"],
};

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-12 border-t border-gold-400/15 bg-cream-100 dark:border-gold-400/10 dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong mb-16 overflow-hidden rounded-3xl p-10 md:p-14"
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight text-navy-950 dark:text-white md:text-4xl">
                Ready to begin your{" "}
                <span className="text-gold-gradient">topper journey?</span>
              </h3>
              <p className="mt-3 text-navy-700/80 dark:text-white/60">
                Schedule a free consultation with our admissions team and find
                the right programme for your child.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:justify-end">
              <a href="tel:+919876543210" className="btn-primary justify-center">
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="mailto:hello@kvmtcc.in" className="btn-ghost justify-center">
                Email Us
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3" aria-label="KVMTCC home">
              <div className="relative flex items-center rounded-lg bg-white/95 px-2.5 py-1.5 ring-1 ring-gold-400/25 dark:bg-cream-50/95">
                <Image
                  src={asset("/logo.png")}
                  alt="KVM Creating Successful Minds"
                  width={160}
                  height={48}
                  className="h-11 w-auto object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">
                  Tuition Centre
                </div>
              </div>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-navy-700/80 dark:text-white/55">
              KVMTCC Tuition Centre is a premium academic institution dedicated
              to nurturing future toppers from Class 8 to 12, across CBSE and
              State Boards.
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500 dark:text-gold-400" />
                <a href="tel:+919876543210" className="text-navy-800 hover:text-gold-600 dark:text-white/75 dark:hover:text-gold-300">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500 dark:text-gold-400" />
                <a href="mailto:hello@kvmtcc.in" className="text-navy-800 hover:text-gold-600 dark:text-white/75 dark:hover:text-gold-300">
                  hello@kvmtcc.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500 dark:text-gold-400" />
                <span className="text-navy-800 dark:text-white/75">
                  KVMTCC Campus, MG Road,
                  <br />
                  Ernakulam, Kerala 682016
                </span>
              </li>
            </ul>
          </div>

          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-300">
                {heading}
              </h4>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-navy-700/80 transition-colors duration-300 hover:text-gold-600 dark:text-white/60 dark:hover:text-gold-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-gold-400/15 pt-8 dark:border-gold-400/10 md:flex-row md:items-center">
          <p className="text-xs text-navy-600/70 dark:text-white/40">
            © {new Date().getFullYear()} KVMTCC Tuition Centre. All rights reserved.
            Crafted with excellence.
          </p>

          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/25 text-navy-700 transition-all duration-300 hover:border-gold-400/60 hover:bg-gold-400/10 hover:text-gold-600 dark:border-gold-400/15 dark:text-white/70 dark:hover:border-gold-400/50 dark:hover:text-gold-300"
                aria-label={`Social link ${i}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
