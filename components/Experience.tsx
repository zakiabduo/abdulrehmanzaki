"use client";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/content";
import { viewport } from "@/lib/variants";
import SectionTitle from "./SectionTitle";
import SpotlightCard from "./SpotlightCard";

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionTitle n={4}>Experience & education</SectionTitle>
        <ol ref={ref} className="relative pl-8">
          <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line" />
          <motion.span aria-hidden style={{ scaleY: scrollYProgress }} className="absolute left-0 top-0 h-full w-px origin-top bg-accent" />
          {timeline.map((t, i) => (
            <motion.li key={t.title} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} transition={{ delay: i * 0.1, duration: 0.6 }} className="relative pb-6 last:pb-0">
              <span aria-hidden className="absolute -left-[2.37rem] top-7 h-3 w-3 rounded-full bg-accent ring-4 ring-bg" />
              <span aria-hidden className="absolute -left-[2.37rem] top-7 h-3 w-3 animate-ping rounded-full bg-accent/40" />
              <SpotlightCard className="p-6"><p className="text-sm text-accent">{t.period}</p><h3 className="mt-1 font-display text-xl sm:text-2xl">{t.title}</h3><p className="text-muted">{t.place}</p></SpotlightCard>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
