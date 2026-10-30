import type { Metadata } from "next";

// The request-access form is shared by every Foxes solution, so it has its own title instead of
// the home page's "Booking Systems & POS" (Search's sign-up landed under Booking's name, 30 Oct 2026).
export const metadata: Metadata = {
  title: "Request access",
  description: "Request access to a Foxes solution. Every request is reviewed by our team within one business day.",
};

export default function RequestAccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
