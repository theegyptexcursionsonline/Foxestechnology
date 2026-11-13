import type { Metadata } from 'next';
import PlainSolutionPage, { type PlainSolution } from '@/components/solutions/PlainSolutionPage';

const TITLE = "Booking reports and settlement summary";
const DESCRIPTION =
  "AI Booking shows your bookings and revenue on the dashboard, a settlement summary of what you receive after reseller commission, and exports bookings to a spreadsheet. Access by invitation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://foxestechnology.com/solutions/analytics' },
  openGraph: {
    title: `${TITLE} · Foxes Technology`,
    description: DESCRIPTION,
    url: 'https://foxestechnology.com/solutions/analytics',
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
  badge: "AI Booking · Reports",
  badgeIcon: "chart",
  headlineLine1: "See your bookings",
  headlineLine2: "and what you are owed.",
  sub: "AI Booking shows your bookings and revenue on the dashboard, gives you a settlement summary of what you receive after reseller commission, and exports your bookings to a spreadsheet.",
  pills: [
    "In your dashboard",
    "Export to a spreadsheet",
    "Access by invitation",
  ],
  inShort: [
    "Bookings and revenue on the dashboard",
    "What you receive after commission",
    "Bookings exported as a CSV file",
  ],
  featuresHeadline: "What you can see today",
  featuresSub: "Figures from your own bookings, in the dashboard.",
  features: [
    {
      icon: "chart",
      title: "Dashboard figures",
      description: "Your bookings and revenue at a glance.",
    },
    {
      icon: "receipt",
      title: "Settlement summary",
      description: "What your bookings bring in after reseller commission.",
    },
    {
      icon: "users",
      title: "Reseller bookings",
      description: "Each reseller booking shows the commission percentage and what you receive.",
    },
    {
      icon: "sheet",
      title: "Export",
      description: "Download your bookings as a CSV file that opens in Excel or Google Sheets.",
    },
  ],
  goodToKnow: [
    "There are no forecasts, scheduled email reports or connections to accounting tools today.",
  ],
  closingHeadline: "See the reports with your own bookings.",
  closingSub: "Access is by invitation. Send a request and our team will reply.",
  requestHref: "/request-access?solution=booking&source=foxestechnology",
};

export default function ReportsPage() {
  return <PlainSolutionPage page={page} />;
}
