"use client";

import { useRef, useCallback } from "react";

export default function SpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const onMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(212,175,55,0.13) 0%, transparent 65%)`;
  }, []);

  const onLeave = useCallback(() => {
    glowRef.current.style.background = "none";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-[background] duration-100"
      />
      {children}
    </div>
  );
}
