"use client";

import { Suspense, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Globe2,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

// Every Foxes solution funnels its signup here with ?solution=<key>&source=<app>.
const SOLUTION_LABELS: Record<string, string> = {
  booking: "AI Booking Engine",
  voice: "AI Voice Agent",
  search: "AI Search Agent",
  attractions: "Attractions Network",
  airport: "Airport Platform",
  support: "Support Portal",
};

// A one-line value line shown under the headline when a solution is in context.
const SOLUTION_BLURB: Record<string, string> = {
  booking: "Sell tours, manage availability and take payments with an AI-native booking engine.",
  voice: "An AI voice agent that answers, qualifies and books your callers around the clock.",
  search: "Conversational, AI-powered search that turns browsers into bookings.",
  attractions: "A multi-tenant ticketing and reseller network for attractions.",
  airport: "Airport transfers, tours and widgets across multiple domains.",
  support: "A unified, AI-assisted support desk for your whole operation.",
};

const ROLES = [
  { key: "operator", label: "Operator / Tour company" },
  { key: "reseller", label: "Reseller" },
  { key: "ota", label: "OTA / Travel agency" },
  { key: "partner", label: "Partner" },
  { key: "other", label: "Other" },
];

const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

function RequestAccessForm() {
  const sp = useSearchParams();
  const solution = (sp.get("solution") || "").toLowerCase();
  const source = sp.get("source") || "";
  const solutionLabel = SOLUTION_LABELS[solution] || "";
  const solutionBlurb = SOLUTION_BLURB[solution] || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2 || !emailOk(email)) return setError("Add your name and a valid work email.");
    if (company.trim().length < 2) return setError("Tell us your company or team.");
    setBusy(true);
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          role,
          message,
          solutions: solution ? [solution] : [],
          source: source || "foxestechnology",
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || "Something went wrong. Please try again.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070709] text-white">
      <Backdrop />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col lg:flex-row">
        {/* Brand showcase */}
        <aside className="flex flex-col justify-between px-6 pt-10 pb-6 lg:w-[54%] lg:px-12 lg:py-14">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 text-[15px] font-black text-white shadow-lg shadow-red-900/40">
                F
              </span>
              <span className="text-[15px] font-bold tracking-tight text-white">Foxes Technology</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-12 max-w-lg lg:mt-16"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-red-300">
                <Lock size={11} /> Invite &amp; approval only
              </span>

              <h1 className="mt-5 text-[2.1rem] font-black leading-[1.08] tracking-tight text-white sm:text-[2.6rem]">
                {solutionLabel ? (
                  <>
                    Request access to
                    <br />
                    <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                      {solutionLabel}
                    </span>
                  </>
                ) : (
                  <>
                    Request access to the
                    <br />
                    <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                      Foxes platform
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300/90">
                {solutionBlurb ||
                  "The AI-native suite powering modern tour operators — booking, voice, search, attractions and support, in one place."}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-10 space-y-3.5 lg:mt-0"
          >
            <Promise icon={<ShieldCheck size={16} />} title="Vetted, invite-only access" sub="Every request is reviewed by our team — no open signups." />
            <Promise icon={<Clock3 size={16} />} title="Reviewed within one business day" sub="We follow up by email with next steps and onboarding." />
            <Promise icon={<Globe2 size={16} />} title="Built for Egypt, the GCC &amp; MENA" sub="Trusted by tour operators and resellers across the region." />
          </motion.div>
        </aside>

        {/* Form */}
        <section className="flex w-full items-center justify-center px-5 pb-12 lg:w-[46%] lg:px-10 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_80px_-32px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-red-600/20 blur-3xl" />

              {done ? (
                <div className="relative flex flex-col items-center gap-3 py-6 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                    <CheckCircle2 size={30} />
                  </span>
                  <h2 className="text-xl font-bold text-white">Request received</h2>
                  <p className="max-w-xs text-sm leading-relaxed text-slate-300/90">
                    Thanks, {name.trim().split(" ")[0] || "there"}. Our team reviews every request and will reach out at{" "}
                    <span className="font-medium text-white">{email}</span> within one business day.
                  </p>
                  <Link
                    href="/"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-red-300 transition hover:text-red-200"
                  >
                    <ArrowLeft size={14} /> Back to Foxes Technology
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-white">Request access</h2>
                    {solutionLabel && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-slate-200">
                        <Sparkles size={10} className="text-amber-300" /> {solutionLabel}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-slate-400">
                    Tell us about you — we&apos;ll review and get you set up.
                  </p>

                  <form onSubmit={submit} className="mt-6 space-y-4">
                    <Field icon={<User size={15} />} label="Full name">
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sara Hassan" className={inputCls} autoFocus />
                    </Field>
                    <Field icon={<Mail size={15} />} label="Work email">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className={inputCls} />
                    </Field>
                    <Field icon={<Building2 size={15} />} label="Company / team">
                      <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Nile Tours" className={inputCls} />
                    </Field>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-medium text-slate-300">Your role</label>
                      <div className="relative">
                        <select value={role} onChange={(e) => setRole(e.target.value)} className={inputCls + " appearance-none pr-9"}>
                          <option value="" className="bg-slate-900">Select one</option>
                          {ROLES.map((r) => (
                            <option key={r.key} value={r.key} className="bg-slate-900">
                              {r.label}
                            </option>
                          ))}
                        </select>
                        <ArrowRight size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-slate-500" />
                      </div>
                    </div>
                    <Field icon={<MessageSquare size={15} />} label="Anything else? (optional)">
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Your use case, who referred you, etc." className={inputCls + " resize-none"} />
                    </Field>

                    {error && <p className="text-sm font-medium text-red-300">{error}</p>}

                    <button
                      type="submit"
                      disabled={busy}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition hover:shadow-xl hover:shadow-red-900/50 disabled:opacity-60"
                    >
                      {busy ? "Submitting…" : "Request access"}
                      {!busy && <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />}
                    </button>
                  </form>

                  <div className="mt-5 flex items-center justify-center gap-1.5 text-[12px] text-slate-500">
                    <ShieldCheck size={12} className="text-red-400/80" /> Reviewed within one business day · No spam
                  </div>
                </div>
              )}
            </div>

            <p className="mt-5 text-center text-[12px] text-slate-500">
              Already approved?{" "}
              <Link href="/" className="font-medium text-slate-300 hover:text-white">
                Sign in from your solution dashboard
              </Link>
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-red-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-red-500/20";

function Field({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-slate-300">
        <span className="text-slate-500">{icon}</span> {label}
      </label>
      {children}
    </div>
  );
}

function Promise({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-red-300">
        {icon}
      </span>
      <div>
        <p className="text-[13.5px] font-semibold text-white">{title}</p>
        <p className="text-[12.5px] leading-snug text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* ambient blooms */}
      <motion.div
        className="absolute -left-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-red-700/20 blur-[120px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-orange-600/15 blur-[120px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* top sheen */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.04] to-transparent" />
    </div>
  );
}

export default function RequestAccessPage() {
  return (
    <Suspense fallback={null}>
      <RequestAccessForm />
    </Suspense>
  );
}
