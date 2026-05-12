"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed left-0 top-0 z-[9999] h-[2px] w-full bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.7)]"
    />
  );
}
