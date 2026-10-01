"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Loader2, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/content";
import SectionTitle from "./SectionTitle";
import SpotlightCard from "./SpotlightCard";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Write at least 10 characters"),
});
type Form = z.infer<typeof schema>;

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);

  const onSubmit = async (data: Form) => {
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error();
      reset(); setToast({ ok: true, msg: "Message sent. I'll reply soon." });
    } catch { setToast({ ok: false, msg: "Message not sent. Try again or email me directly." }); }
    setTimeout(() => setToast(null), 4000);
  };
  const field = "mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base";

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionTitle n={5}>Let&apos;s work together</SectionTitle>
        <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="space-y-4">
            <SpotlightCard className="p-5"><button onClick={copy} className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left"><span className="flex items-center gap-3 break-all"><Mail size={18} />{profile.email}</span><span className="shrink-0 text-xs text-accent">{copied ? "Copied!" : "Copy"}</span></button></SpotlightCard>
            <SpotlightCard className="p-5"><span className="flex min-h-[44px] items-center gap-3"><MapPin size={18} />{profile.location}</span></SpotlightCard>
            <SpotlightCard className="p-5"><a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex min-h-[44px] items-center justify-between gap-3"><span className="flex items-center gap-3"><Linkedin size={18} />LinkedIn</span><ArrowUpRight size={18} className="text-accent" /></a></SpotlightCard>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {(["name", "email"] as const).map((f) => (
            <div key={f}>
              <label htmlFor={f} className="text-sm capitalize">{f}</label>
              <input id={f} type={f === "email" ? "email" : "text"} {...register(f)} aria-invalid={!!errors[f]} className={field} />
              {errors[f] && <p role="alert" className="mt-1 text-sm text-red-500">{errors[f]?.message}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="message" className="text-sm">Message</label>
            <textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} className={field} />
            {errors.message && <p role="alert" className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
          </div>
          <button disabled={isSubmitting} className="btn w-full bg-ink text-bg disabled:opacity-60 sm:w-auto">
            {isSubmitting ? <><Loader2 size={16} className="animate-spin" />Sending</> : "Send message"}
          </button>
        </form>
        </div>
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div role="status" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            className={`fixed inset-x-0 bottom-6 z-[80] mx-auto w-max max-w-[90vw] rounded-full px-6 py-3 text-center text-sm text-white ${toast.ok ? "bg-emerald-600" : "bg-red-600"}`}>{toast.msg}</motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
