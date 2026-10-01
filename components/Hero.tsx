"use client";
import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/data/content";
import Magnetic from "./Magnetic";
import ProfileCard from "./ProfileCard";

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const t = setTimeout(() => {
      if (!del) { setText(w.slice(0, text.length + 1)); if (text.length + 1 === w.length) setTimeout(() => setDel(true), 1200); }
      else { setText(w.slice(0, text.length - 1)); if (text.length - 1 === 0) { setDel(false); setI((i + 1) % words.length); } }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return <span aria-label={words.join(", ")}>{text}<span className="animate-pulse text-accent">|</span></span>;
}

const dots: [number, number, number][] = [[10, 20, 6], [80, 15, 8], [25, 70, 5], [65, 60, 7], [90, 80, 5], [45, 30, 4], [15, 85, 6], [55, 12, 5]];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const y2 = useTransform(scrollY, [0, 600], [0, -80]);
  const mx = useMotionValue(50), my = useMotionValue(40);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgb(var(--accent) / 0.16), transparent 60%)`;
  const words = profile.name.split(" ");
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-24"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width) * 100); my.set(((e.clientY - r.top) / r.height) * 100); }}>
      <div aria-hidden className="bg-grid absolute inset-0" />
      <motion.div aria-hidden style={{ background: spot }} className="pointer-events-none absolute inset-0" />
      <motion.div aria-hidden style={{ y }} className="pointer-events-none absolute -right-24 top-1/4">
        <motion.div animate={{ x: [0, -40, 0], scale: [1, 1.15, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
      </motion.div>
      <motion.div aria-hidden style={{ y: y2 }} className="pointer-events-none absolute -left-24 bottom-0">
        <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </motion.div>
      {dots.map(([l, t, d], i) => (
        <motion.span key={i} aria-hidden style={{ left: `${l}%`, top: `${t}%` }} animate={{ y: [0, -28, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: d, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-accent" />
      ))}
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-sm backdrop-blur">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>
          Open to opportunities
        </motion.p>
        <p className="mb-6 min-h-[1.75rem] text-lg text-muted sm:text-xl"><Typewriter words={profile.roles} /></p>
        <h1 className="h-display">
          {words.map((w, i) => (
            <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span className={`inline-block ${i === words.length - 1 ? "text-gradient" : ""}`} initial={{ y: "110%", rotate: 4 }} animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 1.7 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }} className="mt-8 max-w-xl text-base text-muted sm:text-lg">
          Building user-focused digital products across the web and machine learning.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Magnetic className="w-full sm:w-auto"><a href="#projects" className="btn w-full bg-ink text-bg sm:w-auto">View work</a></Magnetic>
          <Magnetic className="w-full sm:w-auto"><a href={profile.cv} download className="btn w-full border border-line bg-surface/60 sm:w-auto"><Download size={16} />Download CV</a></Magnetic>
        </motion.div>
        </div>
        <ProfileCard />
      </div>
      <a href="#about" aria-label="Scroll to about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted md:block">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="block"><ArrowDown size={20} /></motion.span>
      </a>
    </section>
  );
}
