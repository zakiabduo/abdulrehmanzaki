"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import Lenis from "lenis";
import Cursor from "./Cursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1 });
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem><MotionConfig reducedMotion="user"><Cursor />{children}</MotionConfig></ThemeProvider>;
}
