"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { projects, type Project } from "@/data/content";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import TiltCard from "./TiltCard";

const cats = ["All", "Web", "AI/ML", "Design"] as const;
type ProjectWithImage = Project & { image?: string };

export default function Projects() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [sel, setSel] = useState<Project | null>(null);
  const list = projects.filter((p) => cat === "All" || p.category === cat);
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionTitle n={3}>Projects</SectionTitle>
        <div role="tablist" className="mb-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`min-h-[44px] rounded-full px-5 text-sm ${cat === c ? "bg-ink text-bg" : "border border-line text-muted hover:text-ink"}`}>{c}</button>
          ))}
        </div>
        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.li layout key={p.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                <TiltCard><button onClick={() => setSel(p)} className="group block w-full rounded-2xl border border-line bg-surface p-6 text-left transition-colors hover:border-accent">
                  <div className="mb-6 aspect-video overflow-hidden rounded-xl bg-accent/10">
                    {/* TODO: add project image with next/image */}
  {(p as ProjectWithImage).image && <Image src={(p as ProjectWithImage).image!} alt={`${p.title} screenshot`} width={1280} height={720}
     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />}                  </div>
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">{t}</li>)}</ul>
                </button></TiltCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={sel.title}>
            <motion.div initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.96 }} onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90dvh] w-full max-w-lg overflow-auto rounded-3xl bg-bg p-6 pt-12 sm:p-8">
              <button aria-label="Close" onClick={() => setSel(null)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full hover:bg-accent/10"><X size={18} /></button>
              <h3 className="font-display text-2xl">{sel.title}</h3>
              <p className="mt-4 text-muted">{sel.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{sel.tags.map((t) => <li key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">{t}</li>)}</ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {sel.live && <a href={sel.live} className="btn bg-ink text-bg"><ExternalLink size={16} />Live site</a>}
                {sel.github && <a href={sel.github} className="btn border border-line"><Github size={16} />Code</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
