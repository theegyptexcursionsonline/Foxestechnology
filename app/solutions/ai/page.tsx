import type { Metadata } from 'next';
import PlainSolutionPage, { type PlainSolution } from '@/components/solutions/PlainSolutionPage';

const TITLE = "A booking assistant inside your booking widget";
const DESCRIPTION =
  "The AI Booking widget can include an assistant you switch on. It understands a request typed in plain words, answers questions about your trips and suggests which one fits. Prices, availability and the booking always come from the booking system. Access by invitation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://foxestechnology.com/solutions/ai' },
  openGraph: {
    title: `${TITLE} · Foxes Technology`,
    description: DESCRIPTION,
    url: 'https://foxestechnology.com/solutions/ai',
    siteName: 'Foxes Technology',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} · Foxes Technology`,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

// Every line is something the booking product does today; what it does not do is said under "Good to know".
const page: PlainSolution = {
  badge: "AI Booking · Assistant",
  badgeIcon: "sparkles",
  headlineLine1: "An assistant",
  headlineLine2: "inside your booking widget.",
  sub: "The AI Booking widget can include an assistant, switched on by you. It understands a request typed in plain words, answers questions about your trips and suggests which one fits. Prices, availability and the booking itself always come from the booking system, never from the assistant.",
  pills: [
    "Optional",
    "On your website",
    "Access by invitation",
  ],
  inShort: [
    "Understands a request typed in plain words",
    "Answers questions about your trips",
    "Suggests the trip that fits",
  ],
  featuresHeadline: "What it does today",
  featuresSub: "Three helpers in the booking widget, each one off until you switch it on.",
  features: [
    {
      icon: "chat",
      title: "Plain-words requests",
      description: "A guest types what they want and the widget turns it into a trip, a date and a group size.",
    },
    {
      icon: "search",
      title: "Questions answered",
      description: "It answers questions about your trips from the details you entered.",
    },
    {
      icon: "sparkles",
      title: "Suggestions",
      description: "It suggests trips from your own list.",
    },
    {
      icon: "sliders",
      title: "You decide",
      description: "Each helper is off until you switch it on.",
    },
  ],
  goodToKnow: [
    "The assistant never sets a price, promises a place or makes a booking. Those come from the booking system.",
    "It works in the booking widget on your website. It does not answer on WhatsApp, social media, SMS or email.",
  ],
  related: [
    {
      title: "AI Voice",
      description: "A voice concierge on your website: guests tap to talk in Arabic or English.",
      href: "/solutions/ai-voice",
      icon: "mic",
    },
    {
      title: "AI Search",
      description: "A search and chat widget that answers from your own tours.",
      href: "/solutions/ai-search",
      icon: "search",
    },
  ],
  closingHeadline: "See the assistant in your own booking widget.",
  closingSub: "Access is by invitation. Send a request and our team will reply.",
  requestHref: "/request-access?solution=booking&source=foxestechnology",
};

export default function BookingAssistantPage() {
  return <PlainSolutionPage page={page} />;
}
