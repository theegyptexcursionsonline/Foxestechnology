import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// foxestechnology.com/request-access is the single CRM front: every Foxes SaaS
// (AI Booking / Voice / Search / Attractions / Support) funnels its "sign up"
// here, and this proxies the submission to the Foxes internal CRM, which creates
// a reviewable lead (no direct signup on any solution — approval-gated).
const CRM_URL =
  process.env.CRM_ACCESS_REQUEST_URL ||
  "https://foxes-support-portal-production.up.railway.app/api/access-request";

// Lightweight per-IP rate limit (public, unauthenticated endpoint).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 15 * 60 * 1000);
  if (recent.length >= 8) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests — please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const res = await fetch(CRM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Could not submit your request. Please try again." }, { status: 502 });
  }
}
