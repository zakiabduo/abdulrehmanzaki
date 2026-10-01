"use client";
import { ArrowUp, Linkedin } from "lucide-react";
import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8" style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}>
      <div className="container-x flex flex-col items-center gap-4 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex items-center gap-2">
          <a aria-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full hover:bg-accent/10"><Linkedin size={18} /></a>
          <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grid h-11 w-11 place-items-center rounded-full hover:bg-accent/10"><ArrowUp size={18} /></button>
        </div>
      </div>
    </footer>
  );
}
