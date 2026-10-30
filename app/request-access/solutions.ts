// Every Foxes solution funnels its sign-up to /request-access?solution=<key>&source=<app>. The key
// picks the heading, the blurb and the interest that is ticked in advance; `signIn` is where an
// approved customer of that solution signs in.
interface Solution {
  label: string;
  blurb: string;
  signIn?: string;
}

export const SOLUTIONS = {
  booking: {
    label: "AI Booking Engine",
    blurb: "Sell tours, manage availability and take payments with an AI-native booking engine.",
    signIn: "https://booking.foxestechnology.com/login",
  },
  voice: {
    label: "AI Voice Agent",
    blurb: "An AI voice agent that answers, qualifies and books your callers around the clock.",
    signIn: "https://voice.foxestechnology.com/login",
  },
  search: {
    label: "AI Search Agent",
    blurb: "Conversational, AI-powered search that turns browsers into bookings.",
    signIn: "https://search.foxestechnology.com/login",
  },
  attractions: {
    label: "Attractions Network",
    blurb: "A multi-tenant ticketing and reseller network for attractions.",
  },
  airport: {
    label: "Airport Platform",
    blurb: "Airport transfers, tours and widgets across multiple domains.",
  },
  support: {
    label: "Support Portal",
    blurb: "A unified, AI-assisted support desk for your whole operation.",
  },
} satisfies Record<string, Solution>;

export type SolutionKey = keyof typeof SOLUTIONS;

export const SOLUTION_KEYS = Object.keys(SOLUTIONS) as SolutionKey[];

export const DEFAULT_BLURB =
  "The AI-native suite for tour operators — booking, voice, search, attractions and support, in one place.";

/** The sign-in page for an approved customer of `solution`, when that solution has one. */
export function signInFor(solution: SolutionKey | null): string | null {
  if (!solution) return null;
  const entry: Solution = SOLUTIONS[solution];
  return entry.signIn ?? null;
}

export type SearchParams = Record<string, string | string[] | undefined>;

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

/** The solution a link asks for, or null for none or an unknown one (prototype keys included). */
export function solutionFrom(value: string | string[] | undefined): SolutionKey | null {
  const key = firstValue(value).trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(SOLUTIONS, key) ? (key as SolutionKey) : null;
}

/** The platform a link says the visitor came from (?source=, or ?from=), for the CRM's "Came from". */
export function sourceFrom(params: SearchParams): string {
  return (firstValue(params.source) || firstValue(params.from)).trim().toLowerCase().slice(0, 64);
}
