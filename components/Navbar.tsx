"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { profile } from "@/data/content";

const links = ["about", "skills", "projects", "experience", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => { const el = document.getElementById(l); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "border-b border-line bg-bg/70 backdrop-blur-lg" : ""}`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <nav aria-label="Main" className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold"></a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l}`} className={`rounded-full px-4 py-2 text-sm capitalize transition-colors ${active === l ? "bg-accent/10 text-accent" : "text-muted hover:text-ink"}`}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <button aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-accent/10">
            {mounted && (resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
          </button>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-accent/10 md:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 top-16 z-40 flex h-[calc(100dvh-4rem)] flex-col justify-center gap-2 bg-bg px-8 md:hidden">
            {links.map((l, i) => (
              <motion.a key={l} href={`#${l}`} onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.1 + i * 0.05 } }}
                className="font-display text-4xl capitalize">{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
