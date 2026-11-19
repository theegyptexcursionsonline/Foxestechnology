// Every Foxes solution funnels its sign-up to /request-access?solution=<key>&source=<app>. The key
// picks the heading, the blurb and the interest that is ticked in advance; `signIn` is where an
// approved customer of that solution signs in.
//
// An approved business opens AI Booking, AI Search and FoxesConnect from the Foxes client portal
// (one sign-in, then each product opens already signed in). Their own sign-in pages sit behind a
// "coming soon" access code until each product opens to the public, so pointing an approved
// customer there was a dead end.
export const PORTAL_SIGN_IN = "https://support.foxestechnology.com/login";

interface Solution {
  label: string;
  blurb: string;
  signIn?: string;
}

export const SOLUTIONS = {
  booking: {
    label: "AI Booking Engine",
    blurb: "A booking system for tour and activity operators, with a booking widget for your own website.",
    signIn: PORTAL_SIGN_IN,
  },
  voice: {
    label: "AI Voice Agent",
    blurb: "A voice concierge on your website that answers guests in Arabic or English and takes booking requests.",
    signIn: "https://voice.foxestechnology.com/login",
  },
  search: {
    label: "AI Search Agent",
    blurb: "A search and chat widget that answers visitors from your own tours.",
    signIn: PORTAL_SIGN_IN,
  },
  attractions: {
    label: "Attractions Network",
    blurb: "Websites and online booking for attractions and their resellers.",
  },
  airport: {
    label: "Airport Platform",
    blurb: "Online booking for airport transfers.",
  },
  support: {
    // The key stays "support": the portal files these requests under it.
    label: "FoxesConnect",
    blurb: "A shared inbox for your customer conversations, with an assistant that answers from your own knowledge and hands over to your team.",
    signIn: PORTAL_SIGN_IN,
  },
} satisfies Record<string, Solution>;

export type SolutionKey = keyof typeof SOLUTIONS;

export const SOLUTION_KEYS = Object.keys(SOLUTIONS) as SolutionKey[];

export const DEFAULT_BLURB =
  "Booking, voice, search and support tools for tour and activity operators. Tell us which ones you need.";

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
