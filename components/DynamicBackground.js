"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useEffect } from "react";

export default function DynamicBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const fastX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.4 });
  const fastY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.4 });
  const slowX = useSpring(mouseX, { stiffness: 25, damping: 18, mass: 1.4 });
  const slowY = useSpring(mouseY, { stiffness: 25, damping: 18, mass: 1.4 });

  const spotX = useTransform(fastX, (v) => `${v * 100}%`);
  const spotY = useTransform(fastY, (v) => `${v * 100}%`);

  const spotBg = useMotionTemplate`radial-gradient(900px circle at ${spotX} ${spotY}, rgba(212,175,55,0.42) 0%, rgba(212,175,55,0.18) 25%, rgba(212,175,55,0.06) 50%, transparent 75%)`;
  const spotInner = useMotionTemplate`radial-gradient(420px circle at ${spotX} ${spotY}, rgba(255,215,90,0.3) 0%, rgba(255,215,90,0.12) 35%, transparent 80%)`;

  const orb1X = useTransform(slowX, [0, 1], [-140, 140]);
  const orb1Y = useTransform(slowY, [0, 1], [-90, 90]);
  const orb2X = useTransform(slowX, [0, 1], [120, -120]);
  const orb2Y = useTransform(slowY, [0, 1], [80, -80]);
  const orb3X = useTransform(slowX, [0, 1], [-70, 70]);
  const orb3Y = useTransform(slowY, [0, 1], [60, -60]);

  useEffect(() => {
    let throttle = null;
    let lastInteraction = 0;
    const idleAfter = 1500;

    const onMove = (e) => {
      lastInteraction = performance.now();
      if (throttle) return;
      throttle = requestAnimationFrame(() => {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
        throttle = null;
      });
    };

    let loop;
    const start = performance.now();
    const tick = () => {
      const now = performance.now();
      if (now - lastInteraction > idleAfter) {
        const t = now - start;
        mouseX.set(0.5 + 0.32 * Math.sin(t / 4500));
        mouseY.set(0.5 + 0.32 * Math.cos(t / 5500));
      }
      loop = requestAnimationFrame(tick);
    };
    loop = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onMove);
      if (throttle) cancelAnimationFrame(throttle);
      cancelAnimationFrame(loop);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div className="absolute inset-0 grid-bg opacity-70 dark:opacity-40" />

      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute -left-40 top-[10%] h-[560px] w-[560px] rounded-full bg-gold-400/70 blur-[110px] dark:bg-gold-400/30"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute -right-40 bottom-[8%] h-[640px] w-[640px] rounded-full bg-navy-300/70 blur-[130px] dark:bg-navy-500/50"
      />
      <motion.div
        style={{
          x: orb3X,
          y: orb3Y,
          left: "calc(50% - 240px)",
          top: "calc(50% - 240px)",
        }}
        className="absolute h-[480px] w-[480px] rounded-full bg-gold-300/55 blur-[120px] dark:bg-gold-400/20"
      />

      <motion.div
        style={{ background: spotBg }}
        className="absolute inset-0 dark:mix-blend-screen"
      />
      <motion.div
        style={{ background: spotInner }}
        className="absolute inset-0 dark:mix-blend-screen"
      />
    </div>
  );
}
