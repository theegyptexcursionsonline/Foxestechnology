"use client";

import { Suspense, useMemo, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Phone,
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

const SOLUTION_BLURB: Record<string, string> = {
  booking: "Sell tours, manage availability and take payments with an AI-native booking engine.",
  voice: "An AI voice agent that answers, qualifies and books your callers around the clock.",
  search: "Conversational, AI-powered search that turns browsers into bookings.",
  attractions: "A multi-tenant ticketing and reseller network for attractions.",
  airport: "Airport transfers, tours and widgets across multiple domains.",
  support: "A unified, AI-assisted support desk for your whole operation.",
};

const SOLUTION_OPTIONS = [
  { key: "booking", label: "AI Booking Engine" },
  { key: "voice", label: "AI Voice Agent" },
  { key: "search", label: "AI Search Agent" },
  { key: "attractions", label: "Attractions Network" },
  { key: "airport", label: "Airport Platform" },
  { key: "support", label: "Support Portal" },
];

// Best-effort attribution when a visitor lands from a Foxes solution without an
// explicit ?source= — infer the platform from the referring host.
const REFERRER_SOURCES: { test: RegExp; key: string }[] = [
  { test: /voice/, key: "voice" },
  { test: /search/, key: "search" },
  { test: /attraction|foxes-network/, key: "attractions" },
  { test: /airport/, key: "airport" },
  { test: /foxesconnect/, key: "foxesconnect" },
  { test: /support/, key: "support" },
  { test: /book|foxesapp/, key: "booking" },
];
function referrerSource(): string {
  if (typeof document === "undefined" || !document.referrer) return "";
  try {
    const host = new URL(document.referrer).hostname;
    if (!host || /(^|\.)foxestechnology\.com$/.test(host)) return ""; // same-site isn't a platform signal
    return REFERRER_SOURCES.find((r) => r.test.test(host))?.key || "";
  } catch {
    return "";
  }
}

const ROLE_OPTIONS = ["Owner / Founder", "Director / GM", "Operations", "Marketing", "Sales / Reservations", "Other"];
const COUNTRY_OPTIONS = ["Egypt", "United Arab Emirates", "Saudi Arabia", "Oman", "Qatar", "Kuwait", "Bahrain", "Other (MENA)", "Other"];
const BUSINESS_TYPES = ["Tour operator", "DMC / Destination management", "Reseller / Agent", "OTA / Travel agency", "Attraction / Activity", "Transport / Transfers", "Hotel / Accommodation", "Other"];
const COMPANY_SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"];

const STEPS = [
  { key: "you", title: "About you" },
  { key: "business", title: "Your business" },
  { key: "needs", title: "What you need" },
];

const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

function RequestAccessForm() {
  const sp = useSearchParams();
  const solutionParam = (sp.get("solution") || "").toLowerCase();
  const explicitSource = (sp.get("source") || sp.get("from") || "").toLowerCase();
  const solutionLabel = SOLUTION_LABELS[solutionParam] || "";
  const solutionBlurb = SOLUTION_BLURB[solutionParam] || "";
  // Which Foxes platform this lead came from (the CRM "Came from" attribution):
  // explicit ?source=/?from=, else the chosen ?solution=, else the referring platform
  // host, else the main marketing site. Captured via the platform deep-link's url param.
  const source = useMemo(
    () => explicitSource || (SOLUTION_LABELS[solutionParam] ? solutionParam : "") || referrerSource() || "foxestechnology",
    [explicitSource, solutionParam],
  );

  const [step, setStep] = useState(0);
  // Step 1 — about you
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  // Step 2 — your business
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [companySize, setCompanySize] = useState("");
  // Step 3 — what you need
  const [solutions, setSolutions] = useState<string[]>(SOLUTION_LABELS[solutionParam] ? [solutionParam] : []);
  const [currentSystem, setCurrentSystem] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const toggleSolution = (key: string) =>
    setSolutions((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const validateStep = (s: number): string => {
    if (s === 0) {
      if (name.trim().length < 2) return "Tell us your full name.";
      if (!emailOk(email)) return "Add a valid work email.";
      if (phone.trim().length < 6) return "Add a phone / WhatsApp number so we can reach you.";
    }
    if (s === 1) {
      if (company.trim().length < 2) return "Tell us your company or brand name.";
      if (!businessType) return "Pick the option that best describes your business.";
      if (!country) return "Select your country / region of operation.";
    }
    if (s === 2) {
      if (solutions.length === 0) return "Pick at least one solution you're interested in.";
      if (!consent) return "Please confirm you agree to be contacted about your request.";
    }
    return "";
  };

  const next = () => {
    const err = validateStep(step);
    if (err) return setError(err);
    setError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return next();
    const err = validateStep(2);
    if (err) return setError(err);
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          role,
          company,
          website,
          country,
          businessType,
          companySize,
          solutions,
          currentSystem,
          message,
          source,
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || "Something went wrong. Please try again.");
      setDone(true);
    } catch (err2) {
      setError(err2 instanceof Error ? err2.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070709] text-white">
      <Backdrop />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col lg:flex-row">
        {/* Brand showcase */}
        <aside className="flex flex-col px-6 pb-10 pt-10 lg:w-[50%] lg:px-12 lg:py-14">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image src="/logo.png" alt="Foxes Technology" width={36} height={36} className="h-9 w-9 object-contain" priority />
            <span className="text-[15px] font-bold tracking-tight text-white">Foxes Technology</span>
          </Link>

          <div className="flex flex-1 flex-col justify-center py-10 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-lg"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-red-300">
              <Lock size={11} /> Invite &amp; approval only
            </span>

            <h1 className="mt-5 text-[2.1rem] font-black leading-[1.08] tracking-tight text-white sm:text-[2.6rem]">
              {solutionLabel ? (
                <>
                  Request access to
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">{solutionLabel}</span>
                </>
              ) : (
                <>
                  Request access to the
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">Foxes platform</span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300/90">
              {solutionBlurb ||
                "The AI-native suite powering modern tour operators — booking, voice, search, attractions and support, in one place."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-10 space-y-3.5"
          >
            <TrustItem icon={<ShieldCheck size={16} />} title="Vetted, invite-only access" sub="Every request is reviewed by our team — no open signups." />
            <TrustItem icon={<Clock3 size={16} />} title="Reviewed within one business day" sub="We follow up by email with next steps and onboarding." />
            <TrustItem icon={<Globe2 size={16} />} title="Built for Egypt, the GCC &amp; MENA" sub="Trusted by tour operators and resellers across the region." />
          </motion.div>
          </div>
        </aside>

        {/* Form */}
        <section className="flex w-full items-center justify-center px-5 py-10 lg:w-[50%] lg:px-10 lg:py-14">
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
                  <Link href="/" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-red-300 transition hover:text-red-200">
                    <ArrowLeft size={14} /> Back to Foxes Technology
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-white">Request access</h2>
                      <p className="mt-0.5 text-[13px] text-slate-400">
                        Step {step + 1} of {STEPS.length} · {STEPS[step].title}
                      </p>
                    </div>
                    {solutionLabel && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-slate-200">
                        <Sparkles size={10} className="text-amber-300" /> {solutionLabel}
                      </span>
                    )}
                  </div>

                  {/* progress */}
                  <div className="mt-4 flex gap-1.5">
                    {STEPS.map((s, i) => (
                      <div key={s.key} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-white/10"}`} />
                    ))}
                  </div>

                  <form onSubmit={onSubmit} className="mt-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        {step === 0 && (
                          <>
                            <Field icon={<User size={15} />} label="Full name">
                              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sara Hassan" className={inputCls} autoFocus />
                            </Field>
                            <Field icon={<Mail size={15} />} label="Work email">
                              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className={inputCls} />
                            </Field>
                            <Field icon={<Phone size={15} />} label="Phone / WhatsApp">
                              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+20 1XX XXX XXXX" className={inputCls} />
                            </Field>
                            <Select label="Your role" value={role} onChange={setRole} options={ROLE_OPTIONS} placeholder="Select your role" />
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <Field icon={<Building2 size={15} />} label="Company / brand">
                              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Nile Tours" className={inputCls} autoFocus />
                            </Field>
                            <Field icon={<Globe2 size={15} />} label="Website (optional)">
                              <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="yourcompany.com" className={inputCls} />
                            </Field>
                            <Select label="Business type" value={businessType} onChange={setBusinessType} options={BUSINESS_TYPES} placeholder="What best describes you?" />
                            <div className="grid grid-cols-2 gap-3">
                              <Select label="Country / region" value={country} onChange={setCountry} options={COUNTRY_OPTIONS} placeholder="Select" />
                              <Select label="Company size" value={companySize} onChange={setCompanySize} options={COMPANY_SIZES} placeholder="Team size" />
                            </div>
                          </>
                        )}

                        {step === 2 && (
                          <>
                            <div>
                              <label className="mb-1.5 block text-[13px] font-medium text-slate-300">Solutions you&apos;re interested in</label>
                              <div className="flex flex-wrap gap-2">
                                {SOLUTION_OPTIONS.map((o) => {
                                  const on = solutions.includes(o.key);
                                  return (
                                    <button
                                      type="button"
                                      key={o.key}
                                      onClick={() => toggleSolution(o.key)}
                                      className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition ${
                                        on
                                          ? "border-red-500/50 bg-red-500/15 text-red-200"
                                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
                                      }`}
                                    >
                                      {on && <CheckCircle2 size={12} className="mr-1 inline -translate-y-px" />}
                                      {o.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                            <Field icon={<Sparkles size={15} />} label="What do you use today? (optional)">
                              <input value={currentSystem} onChange={(e) => setCurrentSystem(e.target.value)} placeholder="e.g. Bokun, spreadsheets, none yet" className={inputCls} />
                            </Field>
                            <Field icon={<MessageSquare size={15} />} label="Anything else? (optional)">
                              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={2} placeholder="Your use case, who referred you, etc." className={inputCls + " resize-none"} />
                            </Field>
                            <label className="flex cursor-pointer items-start gap-2.5 pt-0.5 text-[12.5px] leading-snug text-slate-400">
                              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-red-500" />
                              <span>I agree to be contacted by Foxes Technology about my request and understand access is review-based.</span>
                            </label>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {error && <p className="mt-3 text-sm font-medium text-red-300">{error}</p>}

                    <div className="mt-6 flex items-center gap-3">
                      {step > 0 && (
                        <button type="button" onClick={back} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5">
                          <ArrowLeft size={15} /> Back
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={busy}
                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition hover:shadow-xl hover:shadow-red-900/50 disabled:opacity-60"
                      >
                        {busy ? "Submitting…" : step < STEPS.length - 1 ? "Continue" : "Request access"}
                        {!busy && <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />}
                      </button>
                    </div>
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

function Select({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-slate-300">{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls + " appearance-none pr-9"}>
          <option value="" className="bg-slate-900">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-slate-900">
              {o}
            </option>
          ))}
        </select>
        <ArrowRight size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-slate-500" />
      </div>
    </div>
  );
}

function TrustItem({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-red-300">{icon}</span>
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
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)", backgroundSize: "44px 44px" }}
      />
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
