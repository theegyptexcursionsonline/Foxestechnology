import type { Metadata } from 'next';
import PlainSolutionPage, { type PlainSolution } from '@/components/solutions/PlainSolutionPage';

const TITLE = "Desk and phone bookings, no hardware to buy";
const DESCRIPTION =
  "Foxes does not sell POS devices. With AI Booking your team takes walk-in and phone bookings in the browser of the computer, tablet or phone they already use, against the same availability as your website. Access by invitation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://foxestechnology.com/solutions/pos-hardware' },
  openGraph: {
    title: `${TITLE} · Foxes Technology`,
    description: DESCRIPTION,
    url: 'https://foxestechnology.com/solutions/pos-hardware',
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
  badge: "AI Booking · At the desk",
  badgeIcon: "users",
  headlineLine1: "Sell at the desk.",
  headlineLine2: "No hardware to buy.",
  sub: "Foxes does not sell card readers, tablets or terminals. Your team takes walk-in and phone bookings in the AI Booking dashboard, in the browser of the computer, tablet or phone they already use.",
  pills: [
    "Works in your browser",
    "Same availability as your website",
    "Access by invitation",
  ],
  inShort: [
    "Walk-in and phone bookings in the dashboard",
    "Vouchers with a QR code your team can check",
    "Payments recorded on the booking, with a receipt",
  ],
  featuresHeadline: "What your desk can do today",
  featuresSub: "The same bookings list your website uses.",
  features: [
    {
      icon: "users",
      title: "Desk and phone bookings",
      description: "Add a booking in the dashboard with the trip, the option and the add-ons.",
    },
    {
      icon: "calendar",
      title: "One availability",
      description: "Desk bookings draw on the same places as your website, so the last place is sold once.",
    },
    {
      icon: "qr",
      title: "Voucher with QR code",
      description: "The guest prints the voucher or shows it on a phone, and your team checks the code.",
    },
    {
      icon: "receipt",
      title: "Record the payment",
      description: "When a guest pays you, record it on the booking. The guest gets a receipt.",
    },
  ],
  goodToKnow: [
    "Foxes does not supply or sell POS devices, printers or card readers.",
    "Guests pay you directly, the way you take payment today. Card payment at checkout is not switched on yet.",
    "It needs an internet connection. There is no offline mode.",
  ],
  closingHeadline: "See desk bookings in AI Booking.",
  closingSub: "Access is by invitation. Send a request and our team will reply.",
  requestHref: "/request-access?solution=booking&source=foxestechnology",
};

export default function DeskBookingsPage() {
  return <PlainSolutionPage page={page} />;
}
