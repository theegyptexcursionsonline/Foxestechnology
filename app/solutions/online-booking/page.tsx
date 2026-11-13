import type { Metadata } from 'next';
import PlainSolutionPage, { type PlainSolution } from '@/components/solutions/PlainSolutionPage';

const TITLE = "Online booking for tours and activities";
const DESCRIPTION =
  "AI Booking gives tour and activity operators a booking widget for their own website. Guests reserve a trip themselves, desk bookings share the same availability, and every guest gets a voucher in Arabic or English. Access by invitation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://foxestechnology.com/solutions/online-booking' },
  openGraph: {
    title: `${TITLE} · Foxes Technology`,
    description: DESCRIPTION,
    url: 'https://foxestechnology.com/solutions/online-booking',
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
  badge: "AI Booking · Online booking",
  badgeIcon: "calendar",
  headlineLine1: "Take bookings",
  headlineLine2: "on your own website.",
  sub: "AI Booking gives tour and activity operators a booking widget for their own website. Guests choose a trip, a date, a time and the number of people and reserve it themselves. Your team adds desk and phone bookings to the same list.",
  pills: [
    "Access by invitation",
    "Arabic and English for guests",
    "Works in your browser",
  ],
  inShort: [
    "Guests reserve online and pay you directly",
    "The last place cannot be sold twice",
    "Every guest gets a confirmation and a voucher",
  ],
  featuresHeadline: "What it does today",
  featuresSub: "One system for website, desk and partner bookings.",
  features: [
    {
      icon: "calendar",
      title: "Trips, options and prices",
      description: "Set each trip up once: options, prices by guest type, departure times and capacity.",
    },
    {
      icon: "globe",
      title: "A widget for your website",
      description: "Guests pick a trip, a date and a time. The price they see is the price they are booked at.",
    },
    {
      icon: "users",
      title: "Desk and phone bookings",
      description: "Your team adds a booking in the dashboard against the same availability as the website.",
    },
    {
      icon: "ticket",
      title: "Confirmation and voucher",
      description: "Each guest gets an email and a voucher with a QR code, in Arabic or English.",
    },
    {
      icon: "mail",
      title: "Reminder before the trip",
      description: "A reminder goes out at the time you choose, from 1 hour to a week before.",
    },
    {
      icon: "sheet",
      title: "Spreadsheet upload",
      description: "Upload a sheet of bookings. Uploading the same file twice adds nothing.",
    },
    {
      icon: "receipt",
      title: "Resellers and agents",
      description: "Invite an agent to book at a commission percentage. Each booking shows what you receive.",
    },
    {
      icon: "sliders",
      title: "Run the day in four stages",
      description: "Booking lobby, Operation ready, Operating now, Delivered. Move several bookings together.",
    },
  ],
  goodToKnow: [
    "There is no open sign-up. You send a request, our team reads it and replies.",
    "Today guests reserve online and pay you directly. Card payment at checkout is not switched on yet.",
    "There is no direct connection to online travel agencies today. Another system can connect through a standard interface (OCTO) with an access key.",
    "The booking widget, emails and vouchers are in Arabic and English. The dashboard for your team is in English.",
  ],
  closingHeadline: "See AI Booking with your own trips.",
  closingSub: "Access is by invitation. Send a request and our team will reply.",
  requestHref: "/request-access?solution=booking&source=foxestechnology",
};

export default function OnlineBookingPage() {
  return <PlainSolutionPage page={page} />;
}
