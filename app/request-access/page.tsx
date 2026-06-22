"use client";

import { Suspense, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Lock, Mail, MessageSquare, ShieldCheck, User } from "lucide-react";

// Every Foxes solution funnels its signup here with ?solution=<key>&source=<app>.
const SOLUTION_LABELS: Record<string, string> = {
  booking: "AI Booking Engine",
  voice: "AI Voice Agent",
  search: "AI Search Agent",
  attractions: "Attractions Network",
  airport: "Airport Platform",
  support: "Support Portal",
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
        body: JSON.stringify({ name, email, company, role, message, solutions: solution ? [solution] : [], source: source || "foxestechnology" }),
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
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/40 px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-red-600 font-bold text-white">F</span>
          <span className="text-lg font-bold tracking-tight text-slate-900">Foxes Technology</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] sm:p-9">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-1 ring-emerald-100">
                <CheckCircle2 size={26} />
              </span>
              <h1 className="text-xl font-bold text-slate-900">Request received</h1>
              <p className="text-sm leading-relaxed text-slate-500">
                Thanks, {name.trim().split(" ")[0] || "there"}. Our team reviews every request and will get back to you at{" "}
                <span className="font-medium text-slate-700">{email}</span>.
              </p>
              <Link href="/" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700">
                <ArrowLeft size={14} /> Back to Foxes Technology
              </Link>
            </div>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-red-600 ring-1 ring-red-100">
                <Lock size={11} /> Invite & approval only
              </span>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">Request access</h1>
              {solutionLabel ? (
                <p className="mt-1 text-sm text-slate-500">
                  For <span className="font-semibold text-slate-700">{solutionLabel}</span>. Tell us about you — every request is reviewed by our team.
                </p>
              ) : (
                <p className="mt-1 text-sm text-slate-500">Tell us about you — every request is reviewed by our team.</p>
              )}

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
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Your role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className={inputCls + " appearance-none"}>
                    <option value="">Select one</option>
                    {ROLES.map((r) => (
                      <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                  </select>
                </div>
                <Field icon={<MessageSquare size={15} />} label="Anything else? (optional)">
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Your use case, who referred you, etc." className={inputCls + " resize-none"} />
                </Field>

                {error && <p className="text-sm font-medium text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_-12px_rgba(220,38,38,0.7)] transition hover:bg-red-700 disabled:opacity-50"
                >
                  {busy ? "Submitting…" : "Request access"} {!busy && <ArrowRight size={16} />}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[12px] text-slate-400">
                <ShieldCheck size={12} className="text-red-400" /> Reviewed within one business day
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-100";

function Field({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
        <span className="text-slate-400">{icon}</span> {label}
      </label>
      {children}
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
