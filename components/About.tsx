"use client";
import { animate, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile, stats } from "@/data/content";
import { fadeUp, stagger, viewport } from "@/lib/variants";
import SectionTitle from "./SectionTitle";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 1.4, onUpdate: (v) => setN(Math.round(v)) }); return () => c.stop(); } }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

const orbit = [
  { label: "Python", angle: 0, ring: 0 }, { label: "React", angle: 180, ring: 0 },
  { label: "ML", angle: 90, ring: 1 }, { label: "Figma", angle: 270, ring: 1 },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionTitle n={1}>Software engineer who designs.</SectionTitle>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <motion.div variants={fadeUp} className="relative mx-auto aspect-square w-full max-w-sm lg:mx-0">
            {[0, 1].map((r) => (
              <motion.div key={r} aria-hidden animate={{ rotate: r ? -360 : 360 }} transition={{ duration: r ? 30 : 22, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full border border-dashed border-accent/40" style={{ inset: r ? "14%" : "0%" }}>
                {orbit.filter((o) => o.ring === r).map((o) => (
                  <div key={o.label} className="absolute inset-0" style={{ transform: `rotate(${o.angle}deg)` }}>
                    <motion.span animate={{ rotate: [-o.angle, -o.angle + (r ? 360 : -360)] }} transition={{ duration: r ? 30 : 22, repeat: Infinity, ease: "linear" }}
                      style={{ x: "-50%", y: "-50%" }} className="absolute left-1/2 top-0 rounded-full border border-line bg-surface px-3 py-1 text-xs shadow-sm">{o.label}</motion.span>
                  </div>
                ))}
              </motion.div>
            ))}
            {/* TODO: replace the initials with <Image src="/me.jpg" alt={profile.name} fill className="rounded-full object-cover" /> */}
            <div className="absolute inset-[30%] overflow-hidden rounded-full border border-line shadow-xl">
  <Image
    src="/me.jpg.png"
    alt={profile.name}
    fill
    sizes="(min-width: 1000px) 12rem, 10vw"
    className="object-cover object-[center_28%]"
  />
</div>
          </motion.div>
          <div>
            <motion.p variants={fadeUp} className="max-w-prose text-lg leading-relaxed text-muted">{profile.bio}</motion.p>
            <motion.dl variants={fadeUp} className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <motion.div key={s.label} whileHover={{ y: -4 }} className="border-t border-line pt-4">
                  <dd className="font-display text-3xl sm:text-5xl"><Counter to={s.value} />+</dd>
                  <dt className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dt>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
