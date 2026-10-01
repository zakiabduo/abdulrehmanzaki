"use client";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/content";
import { fadeUp, stagger, viewport } from "@/lib/variants";
import SectionTitle from "./SectionTitle";
import SpotlightCard from "./SpotlightCard";

const all = skillGroups.flatMap((g) => g.items);

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionTitle n={2}>Skills</SectionTitle>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((g, i) => (
            <motion.div key={g.title} variants={fadeUp}>
              <SpotlightCard className="h-full p-6">
                <div className="mb-5 flex items-start justify-between">
                  <h3 className="font-display text-xl">{g.title}</h3>
                  <span className="font-display text-4xl text-accent/30 transition-colors group-hover:text-accent">0{i + 1}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <motion.li key={s} whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.96 }} className="cursor-default rounded-full border border-line bg-bg px-4 py-2 text-sm hover:border-accent hover:text-accent">{s}</motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div aria-hidden className="marquee mt-12 overflow-hidden border-y border-line py-5 sm:mt-16">
        <div className="marquee-track">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="mr-10 whitespace-nowrap font-display text-2xl text-muted sm:text-3xl">{s} <span className="text-accent">✦</span></span>
          ))}
        </div>
      </div>
    </section>
  );
}
