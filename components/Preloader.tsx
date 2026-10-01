"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1500, 1);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { setShow(false); document.body.style.overflow = ""; }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex h-[100dvh] flex-col items-center justify-center bg-ink text-bg" aria-label="Loading">
          <div className="flex overflow-hidden font-display text-6xl sm:text-8xl">
            {"".split("").map((c, i) => (
              <motion.span key={c} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{c}</motion.span>
            ))}
          </div>
          <p className="mt-3 text-sm tracking-widest opacity-70">{profile.name.toUpperCase()}</p>
          <div className="mt-10 h-px w-48 bg-bg/20"><div className="h-full origin-left bg-bg" style={{ transform: `scaleX(${n / 100})` }} /></div>
          <p className="mt-3 text-xs tabular-nums opacity-70">{n}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
