"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const x = useSpring(mx, { stiffness: 130, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 130, damping: 20, mass: 0.5 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
      const interactive = e.target.closest(
        "a, button, [role='button'], input, textarea, select, label"
      );
      setHovering(!!interactive);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [visible, mx, my]);

  return (
    <motion.div
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.7 : 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="pointer-events-none fixed left-0 top-0 z-[99999] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        style={{
          filter: hovering
            ? "drop-shadow(0 0 7px rgba(212,175,55,1))"
            : "drop-shadow(0 0 3px rgba(212,175,55,0.6))",
        }}
      >
        {/* 4-pointed sparkle star */}
        <path
          d="M12 0 L13.8 10.2 L24 12 L13.8 13.8 L12 24 L10.2 13.8 L0 12 L10.2 10.2 Z"
          fill="rgba(212,175,55,0.95)"
        />
      </motion.svg>
    </motion.div>
  );
}
