"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { DEFAULT_BLURB, SOLUTIONS, SOLUTION_KEYS, signInFor, type SolutionKey } from "./solutions";

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

interface RequestAccessFormProps {
  /** The solution the visitor's link named, read on the server so the heading arrives with the page. */
  solution: SolutionKey | null;
  /** The platform the link says the visitor came from; empty when it named none. */
  source: string;
}

/**
 * The request-access page (rebuilt 30 Oct 2026, reference pass in the workspace's
 * planning/auth-pages-2026-10-30/research). The page is rendered on the server and nothing on it
 * starts invisible, so the heading and the first step paint with the HTML instead of fading in after
 * the script. On a phone the heading and the whole first step, Continue included, fit the first
 * 390×664 screen; the reasons to trust the review follow the form instead of preceding it.
 */
export function RequestAccessForm({ solution, source }: RequestAccessFormProps) {
  const solutionLabel = solution ? SOLUTIONS[solution].label : "";
  const signIn = signInFor(solution);

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
  const [solutions, setSolutions] = useState<string[]>(solution ? [solution] : []);
  const [currentSystem, setCurrentSystem] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  // One submission at a time: a second Enter lands before `busy` re-renders the button.
  const inFlight = useRef(false);
  // The confirmation replaces the form, so focus moves to it and screen readers announce it.
  const doneHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (done) doneHeading.current?.focus();
  }, [done]);

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
    if (inFlight.current) return;
    inFlight.current = true;
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
          // Which Foxes platform this lead came from (the CRM "Came from" attribution):
          // explicit ?source=/?from=, else the chosen ?solution=, else the referring platform
          // host, else the main marketing site.
          source: source || solution || referrerSource() || "foxestechnology",
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || "Something went wrong. Please try again.");
      setDone(true);
    } catch (err2) {
      setError(err2 instanceof Error ? err2.message : "Something went wrong. Please try again.");
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070709] text-white">
      <Backdrop />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl content-start gap-y-4 px-4 pb-10 pt-3 sm:gap-y-8 sm:px-6 sm:pt-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto_auto_1fr] lg:content-normal lg:gap-x-12 lg:gap-y-0 lg:px-12 lg:py-14">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 justify-self-start lg:col-start-1 lg:row-start-1">
          <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
          <span className="text-[15px] font-bold tracking-tight text-white">Foxes Technology</span>
        </Link>

        <div className="max-w-lg lg:col-start-1 lg:row-start-3">
          <p className="hidden items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-red-300 sm:inline-flex">
            <Lock size={11} aria-hidden="true" /> Invite &amp; approval only
          </p>

          {/* The space before each line break keeps the heading's text "Request access to AI …" for
              screen readers and search engines; it read "Request access toAI …". */}
          <h1 className="text-[1.6rem] font-black leading-[1.1] tracking-tight text-white sm:mt-5 sm:text-[2.1rem] lg:text-[2.6rem] lg:leading-[1.08]">
            {solutionLabel ? (
              <>
                Request access to{" "}
                <br />
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">{solutionLabel}</span>
              </>
            ) : (
              <>
                Request access to the{" "}
                <br />
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">Foxes platform</span>
              </>
            )}
          </h1>

          <p className="mt-1.5 max-w-md text-[14px] leading-snug text-slate-300/90 sm:mt-4 sm:text-[15px] sm:leading-relaxed">
            {solution ? SOLUTIONS[solution].blurb : DEFAULT_BLURB}
          </p>
        </div>

        <section aria-labelledby="request-access-title" className="lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:flex lg:items-center lg:justify-center">
          <div className="w-full sm:max-w-md lg:mx-auto">
            <div className="relative sm:overflow-hidden sm:rounded-3xl sm:border sm:border-white/10 sm:bg-white/[0.04] sm:p-8 sm:shadow-[0_30px_80px_-32px_rgba(0,0,0,0.8)] sm:backdrop-blur-xl">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 hidden h-44 w-44 rounded-full bg-red-600/20 blur-3xl sm:block" />

              {done ? (
                <div className="relative flex flex-col items-center gap-3 py-6 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                    <CheckCircle2 size={30} aria-hidden="true" />
                  </span>
                  <h2 id="request-access-title" ref={doneHeading} tabIndex={-1} className="text-xl font-bold text-white outline-none">
                    Request received
                  </h2>
                  <p className="max-w-xs text-sm leading-relaxed text-slate-300/90">
                    Thanks, {name.trim().split(" ")[0] || "there"}. Our team reviews every request and will follow up at{" "}
                    <span className="font-medium text-white">{email}</span>.
                  </p>
                  <Link href="/" className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-red-300 transition hover:text-red-200">
                    <ArrowLeft size={14} aria-hidden="true" /> Back to Foxes Technology
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 id="request-access-title" className="sr-only text-xl font-bold tracking-tight text-white sm:not-sr-only">
                        Request access
                      </h2>
                      <p className="text-[13px] text-slate-400 sm:mt-0.5" aria-live="polite">
                        Step {step + 1} of {STEPS.length} · {STEPS[step].title}
                      </p>
                    </div>
                    {solutionLabel && (
                      <span className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-slate-200 sm:inline-flex">
                        <Sparkles size={10} className="text-amber-300" aria-hidden="true" /> {solutionLabel}
                      </span>
                    )}
                  </div>

                  <div aria-hidden="true" className="mt-3 flex gap-1.5 sm:mt-4">
                    {STEPS.map((s, i) => (
                      <div key={s.key} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-white/10"}`} />
                    ))}
                  </div>

                  <form onSubmit={onSubmit} noValidate className="mt-4 sm:mt-6">
                    {/* initial={false}: the first step is drawn as it will stay, so the server HTML shows it;
                        later steps fade (no sideways movement, which reduced-motion settings ask to avoid). */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        {step === 0 && (
                          <>
                            <TextField icon={<User size={15} />} label="Full name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sara Hassan" />
                            <TextField icon={<Mail size={15} />} label="Work email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
                            <TextField icon={<Phone size={15} />} label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+20 1XX XXX XXXX" />
                            <Select label="Your role" name="role" value={role} onChange={setRole} options={ROLE_OPTIONS} placeholder="Select your role" />
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <TextField icon={<Building2 size={15} />} label="Company / brand" name="organization" autoComplete="organization" required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Nile Tours" autoFocus />
                            <TextField icon={<Globe2 size={15} />} label="Website (optional)" name="website" inputMode="url" autoComplete="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="yourcompany.com" />
                            <Select label="Business type" name="business-type" required value={businessType} onChange={setBusinessType} options={BUSINESS_TYPES} placeholder="What best describes you?" />
                            <div className="grid grid-cols-2 gap-3">
                              <Select label="Country / region" name="country" autoComplete="country-name" required value={country} onChange={setCountry} options={COUNTRY_OPTIONS} placeholder="Select" />
                              <Select label="Company size" name="company-size" value={companySize} onChange={setCompanySize} options={COMPANY_SIZES} placeholder="Team size" />
                            </div>
                          </>
                        )}

                        {step === 2 && (
                          <>
                            <fieldset>
                              <legend className="mb-1.5 block text-[13px] font-medium text-slate-300">Solutions you&apos;re interested in</legend>
                              <div className="flex flex-wrap gap-2">
                                {SOLUTION_KEYS.map((key) => {
                                  const on = solutions.includes(key);
                                  return (
                                    <button
                                      type="button"
                                      key={key}
                                      aria-pressed={on}
                                      onClick={() => toggleSolution(key)}
                                      className={`inline-flex min-h-11 items-center rounded-full border px-3.5 text-[13px] font-medium transition ${
                                        on
                                          ? "border-red-500/50 bg-red-500/15 text-red-200"
                                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
                                      }`}
                                    >
                                      {on && <CheckCircle2 size={12} className="mr-1" aria-hidden="true" />}
                                      {SOLUTIONS[key].label}
                                    </button>
                                  );
                                })}
                              </div>
                            </fieldset>
                            <TextField icon={<Sparkles size={15} />} label="What do you use today? (optional)" name="current-system" autoComplete="off" value={currentSystem} onChange={(e) => setCurrentSystem(e.target.value)} placeholder="e.g. Bokun, spreadsheets, none yet" />
                            <TextArea icon={<MessageSquare size={15} />} label="Anything else? (optional)" value={message} onChange={setMessage} placeholder="Your use case, who referred you, etc." />
                            <label className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-[12.5px] leading-snug text-slate-400">
                              <input type="checkbox" name="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-red-500" />
                              <span>I agree to be contacted by Foxes Technology about my request and understand access is review-based.</span>
                            </label>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {error && (
                      <p role="alert" className="mt-3 text-sm font-medium text-red-300">
                        {error}
                      </p>
                    )}

                    <div className="mt-5 flex items-center gap-3 sm:mt-6">
                      {step > 0 && (
                        <button type="button" onClick={back} className="inline-flex min-h-12 items-center gap-1.5 rounded-xl border border-white/10 px-4 text-sm font-medium text-slate-300 transition hover:bg-white/5">
                          <ArrowLeft size={15} aria-hidden="true" /> Back
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={busy}
                        className="group flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-4 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition hover:shadow-xl hover:shadow-red-900/50 disabled:opacity-60"
                      >
                        {busy ? "Submitting…" : step < STEPS.length - 1 ? "Continue" : "Request access"}
                        {!busy && <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />}
                      </button>
                    </div>
                  </form>

                  <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[12px] text-slate-400 sm:mt-5">
                    <ShieldCheck size={12} aria-hidden="true" className="shrink-0 text-red-400/80" /> Access is by approval: our team reviews every request.
                  </p>
                </div>
              )}
            </div>

            <p className="mt-3 text-center text-[12px] text-slate-400 sm:mt-5">
              Already approved?{" "}
              {signIn ? (
                <a href={signIn} className="-my-[13px] inline-block py-[13px] font-medium text-slate-200 underline-offset-4 hover:text-white hover:underline">
                  Sign in to {solutionLabel}
                </a>
              ) : (
                "Sign in on your product's own site."
              )}
            </p>
          </div>
        </section>

        <ul className="space-y-3.5 border-t border-white/10 pt-6 sm:border-0 sm:pt-0 lg:col-start-1 lg:row-start-4 lg:mt-10">
          <TrustItem icon={<ShieldCheck size={16} />} title="Vetted, invite-only access" sub="Every request is reviewed by our team — no open signups." />
          <TrustItem icon={<Mail size={16} />} title="Next steps by email" sub="Once your request is reviewed, we follow up by email with next steps and onboarding." />
          <TrustItem icon={<Globe2 size={16} />} title="Built for Egypt, the GCC & MENA" sub="Made for tour operators, attractions and resellers across the region." />
        </ul>
      </div>
    </main>
  );
}

const inputCls =
  "min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-base text-white outline-none transition-colors placeholder:text-slate-500 focus:border-red-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-red-500/20 sm:text-sm";

function FieldLabel({ htmlFor, icon, children }: { htmlFor: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-slate-300">
      {icon && (
        <span aria-hidden="true" className="text-slate-500">
          {icon}
        </span>
      )}
      {children}
    </label>
  );
}

function TextField({ icon, label, ...input }: { icon: ReactNode; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id} icon={icon}>
        {label}
      </FieldLabel>
      <input id={id} {...input} className={inputCls} />
    </div>
  );
}

function TextArea({ icon, label, value, onChange, placeholder }: { icon: ReactNode; label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id} icon={icon}>
        {label}
      </FieldLabel>
      <textarea id={id} name="message" value={value} onChange={(e) => onChange(e.target.value)} rows={2} placeholder={placeholder} className={inputCls + " resize-none"} />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select id={id} name={name} required={required} autoComplete={autoComplete} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls + " appearance-none pr-9"}>
          <option value="" className="bg-slate-900">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-slate-900">
              {o}
            </option>
          ))}
        </select>
        <ArrowRight size={14} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-slate-500" />
      </div>
    </div>
  );
}

function TrustItem({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden="true" className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-red-300">
        {icon}
      </span>
      <div>
        <p className="text-[13.5px] font-semibold text-white">{title}</p>
        <p className="text-[12.5px] leading-snug text-slate-400">{sub}</p>
      </div>
    </li>
  );
}

// Still glows, no longer pulses: two 26rem blurred layers rescaling forever kept phones repainting
// and ignored reduced-motion settings.
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)", backgroundSize: "44px 44px" }}
      />
      <div className="absolute -left-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-red-700/20 opacity-60 blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-orange-600/15 opacity-45 blur-[120px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.04] to-transparent" />
    </div>
  );
}
