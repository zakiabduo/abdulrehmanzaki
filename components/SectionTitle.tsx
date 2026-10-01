"use client";
import { motion } from "framer-motion";
import { viewport } from "@/lib/variants";

// Every section uses this: same eyebrow, title, accent line and the same gap below (mb-12 / sm:mb-16).
export default function SectionTitle({ n, children }: { n?: number; children: React.ReactNode }) {
  return (
    <div className="mb-12 sm:mb-16">
      {n && <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">0{n} /</p>}
      <span className="block overflow-hidden">
        <motion.h2 initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={viewport} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="h-section pb-1">{children}</motion.h2>
      </span>
      <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={viewport} transition={{ delay: 0.3, duration: 0.8 }} className="mt-4 block h-1 w-16 origin-left rounded-full bg-accent" />
    </div>
  );
}
