"use client";
import { motion } from "framer-motion";
import { Download, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/content";
import Image from "next/image";
import TiltCard from "./TiltCard";

const chips = ["Python", "React.js", "MongoDB", "Figma"];
const float = (delay = 0) => ({ animate: { y: [0, -8, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay } });

export default function ProfileCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.8 }} className="mx-auto w-full max-w-sm lg:ml-auto lg:mr-0">
      <TiltCard className="relative">
        <motion.div {...float()} className="relative">
          <motion.span {...float(0.8)} aria-hidden className="absolute -left-5 top-24 z-10 hidden rounded-full border border-line bg-surface px-3 py-1 text-xs shadow-lg sm:block">Python</motion.span>
          <motion.span {...float(1.6)} aria-hidden className="absolute -right-5 bottom-32 z-10 hidden rounded-full border border-line bg-surface px-3 py-1 text-xs shadow-lg sm:block">React</motion.span>
          <div className="relative overflow-hidden rounded-3xl p-px shadow-2xl shadow-accent/20">
            <div aria-hidden className="spin-slow absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0%,rgb(var(--accent))_20%,transparent_40%)]" />
            <div className="relative rounded-[calc(1.5rem-1px)] bg-surface/95 p-6 backdrop-blur-xl sm:p-7">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="rounded-full bg-gradient-to-br from-accent to-accent/30 p-[3px]">
                    <Image src="/me.jpg.png" alt={profile.name} width={80} height={80} className="h-30 w-30 rounded-full object-cover" />
                  </div>
                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-surface bg-emerald-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl leading-tight">{profile.name}</h3>
                  <p className="text-sm text-muted">{profile.roles[0]}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin size={12} />{profile.location}</p>
                </div>
              </div>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {chips.map((c) => <li key={c} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">{c}</li>)}
              </ul>
              <p className="relative mt-5 flex items-center gap-2 rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>
                Available for projects
              </p>
              <div className="relative mt-5 grid grid-cols-2 gap-3">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn border border-line text-sm hover:border-accent"><Linkedin size={16} />LinkedIn</a>
                <a href={`mailto:${profile.email}`} className="btn bg-ink text-sm text-bg"><Mail size={16} />Email</a>
                <a href={profile.cv} download className="btn col-span-2 border border-line text-sm hover:border-accent"><Download size={16} />Download CV</a>
              </div>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}
