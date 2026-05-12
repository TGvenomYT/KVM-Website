"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function DynamicBackground() {
  const canvasRef = useRef(null);
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

  // Particle canvas — same layer as orbs, zero sync issues
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.18 + 0.04),
      base: Math.random() * 0.55 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.018 + 0.006,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.speed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const opacity = p.base + Math.sin(p.phase) * p.base * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${opacity.toFixed(3)})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

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
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
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
