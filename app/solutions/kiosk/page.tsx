import type { Metadata } from 'next';
import PlainSolutionPage, { type PlainSolution } from '@/components/solutions/PlainSolutionPage';

const TITLE = "Self-service booking, no kiosk to buy";
const DESCRIPTION =
  "Foxes does not supply kiosks. Self-service today is the AI Booking widget on your website: a guest opens it on their own phone, picks a trip, a date and a time, and reserves, in Arabic or English. Access by invitation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://foxestechnology.com/solutions/kiosk' },
  openGraph: {
    title: `${TITLE} · Foxes Technology`,
    description: DESCRIPTION,
    url: 'https://foxestechnology.com/solutions/kiosk',
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
  badge: "AI Booking · Self-service",
  badgeIcon: "ticket",
  headlineLine1: "Guests book for themselves.",
  headlineLine2: "On their own phone.",
  sub: "Foxes does not supply kiosk hardware. Self-service today is the AI Booking widget on your website: a guest opens it on their own phone, picks a trip, a date and a time, and reserves.",
  pills: [
    "Arabic and English",
    "Day and night",
    "Access by invitation",
  ],
  inShort: [
    "A booking widget for your own website",
    "Arabic and English, right to left in Arabic",
    "A confirmation and a voucher for every guest",
  ],
  featuresHeadline: "What a guest can do today",
  featuresSub: "On the booking widget, without calling your desk.",
  features: [
    {
      icon: "calendar",
      title: "Pick a trip, a date and a time",
      description: "Departure times and capacity are the ones you set.",
    },
    {
      icon: "users",
      title: "See what is left",
      description: "Each departure has its own places, and the last one is sold once.",
    },
    {
      icon: "sparkles",
      title: "Choose add-ons",
      description: "Add-ons are priced by the system, so the total is right.",
    },
    {
      icon: "ticket",
      title: "Get a voucher",
      description: "A confirmation email and a voucher with a QR code, in Arabic or English.",
    },
  ],
  goodToKnow: [
    "Foxes does not supply or sell self-service kiosks.",
    "Today guests reserve online and pay you directly. Card payment at checkout is not switched on yet.",
  ],
  closingHeadline: "See the booking widget with your own trips.",
  closingSub: "Access is by invitation. Send a request and our team will reply.",
  requestHref: "/request-access?solution=booking&source=foxestechnology",
};

export default function SelfServicePage() {
  return <PlainSolutionPage page={page} />;
}
