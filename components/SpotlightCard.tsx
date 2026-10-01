"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(-300), y = useMotionValue(-300);
  const bg = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgb(var(--accent) / 0.16), transparent 70%)`;
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-line bg-surface/60 transition-colors hover:border-accent ${className}`}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top); }}>
      <motion.div aria-hidden style={{ background: bg }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
}
