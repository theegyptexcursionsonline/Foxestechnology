'use client';

import { usePathname } from 'next/navigation';
import { CalendarDays, Check, Clock, Mail, QrCode, ShieldCheck, Users } from 'lucide-react';
import type { Locale } from '@/lib/i18n/operators';

/**
 * The three example panels beside "what it does today" on every operator landing page, and the
 * short list beside the enquiry form.
 *
 * Each panel pictures something the booking product does now: a guest reserving on the widget,
 * the confirmation and voucher that follow, and the four-stage day board. They are drawn, not
 * screenshots, so each one is labelled as an example. Names, trips and times are made up.
 */
export type Trade = 'boat' | 'dinner' | 'diving' | 'agency' | 'water';

type Sample = { trip: string; option: string; times: [string, string, string]; guest: string; ref: string };

const SAMPLES: Record<Locale, Record<Trade, Sample>> = {
  en: {
    boat: { trip: 'Half-day speedboat charter', option: 'Private boat', times: ['09:00', '13:00', '16:30'], guest: 'Guest name', ref: 'Example booking' },
    dinner: { trip: 'Nile dinner cruise', option: 'Dinner and show', times: ['18:30', '20:30', '22:00'], guest: 'Guest name', ref: 'Example booking' },
    diving: { trip: 'Two-dive day trip', option: 'Boat dive', times: ['08:00', '08:30', '09:00'], guest: 'Guest name', ref: 'Example booking' },
    agency: { trip: 'Luxor day tour', option: 'Small group', times: ['05:00', '06:00', '07:00'], guest: 'Guest name', ref: 'Example booking' },
    water: { trip: 'Jet ski session', option: '30 minutes', times: ['10:00', '10:30', '11:00'], guest: 'Guest name', ref: 'Example booking' },
  },
  ar: {
    boat: { trip: 'رحلة قارب سريع لنصف يوم', option: 'قارب خاص', times: ['09:00', '13:00', '16:30'], guest: 'اسم الضيف', ref: 'حجز تجريبي' },
    dinner: { trip: 'رحلة عشاء نيلية', option: 'عشاء وعرض', times: ['18:30', '20:30', '22:00'], guest: 'اسم الضيف', ref: 'حجز تجريبي' },
    diving: { trip: 'رحلة غوص يومية بغطستين', option: 'غوص من القارب', times: ['08:00', '08:30', '09:00'], guest: 'اسم الضيف', ref: 'حجز تجريبي' },
    agency: { trip: 'جولة الأقصر ليوم واحد', option: 'مجموعة صغيرة', times: ['05:00', '06:00', '07:00'], guest: 'اسم الضيف', ref: 'حجز تجريبي' },
    water: { trip: 'جلسة جت سكي', option: '30 دقيقة', times: ['10:00', '10:30', '11:00'], guest: 'اسم الضيف', ref: 'حجز تجريبي' },
  },
};

const T = {
  en: {
    example: 'EXAMPLE',
    widgetTitle: 'On your website',
    date: 'Date',
    dateValue: 'Sat 14 Nov',
    guests: 'Guests',
    guestsValue: '4 adults',
    departure: 'Departure',
    left: '2 places left',
    full: 'Full',
    reserve: 'Reserve',
    reserveNote: 'The price shown is the price booked. The last place is sold once.',
    voucherTitle: 'After the booking',
    confirmed: 'Reserved',
    rows: ['Guests', 'Hotel pickup', 'Add-ons', 'Payment'],
    rowValues: ['4 adults', 'Hotel lobby, 30 minutes before', 'As chosen by the guest', 'Paid to you directly'],
    sent: ['Confirmation email sent', 'Voucher with QR code', 'Reminder before the trip'],
    languages: 'Arabic or English',
    boardTitle: 'Your day',
    stages: ['Booking lobby', 'Operation ready', 'Operating now', 'Delivered'],
    selected: '2 selected',
    move: 'Move to Operation ready',
    boardNote: 'Guide, driver and vehicle or boat on every booking.',
    booking: 'Booking',
    assigned: 'Guide and driver assigned',
    waiting: 'Waiting to be assigned',
  },
  ar: {
    example: 'مثال',
    widgetTitle: 'على موقعك',
    date: 'التاريخ',
    dateValue: 'السبت 14 نوفمبر',
    guests: 'الضيوف',
    guestsValue: '4 بالغين',
    departure: 'موعد الانطلاق',
    left: 'بقي مكانان',
    full: 'مكتمل',
    reserve: 'احجز',
    reserveNote: 'السعر المعروض هو سعر الحجز. وآخر مكان يُباع مرة واحدة.',
    voucherTitle: 'بعد الحجز',
    confirmed: 'محجوز',
    rows: ['الضيوف', 'الاستقبال من الفندق', 'الإضافات', 'الدفع'],
    rowValues: ['4 بالغين', 'بهو الفندق، قبل الموعد بـ 30 دقيقة', 'كما اختارها الضيف', 'يُدفع لك مباشرة'],
    sent: ['أُرسل بريد التأكيد', 'قسيمة برمز QR', 'تذكير قبل الرحلة'],
    languages: 'بالعربية أو الإنجليزية',
    boardTitle: 'يومك',
    stages: ['استقبال الحجوزات', 'جاهز للتشغيل', 'قيد التشغيل', 'تم التسليم'],
    selected: 'تم تحديد 2',
    move: 'انقل إلى «جاهز للتشغيل»',
    boardNote: 'مرشد وسائق ومركبة أو قارب لكل حجز.',
    booking: 'حجز',
    assigned: 'تم تعيين المرشد والسائق',
    waiting: 'بانتظار التعيين',
  },
} as const;

/** The language of the page being shown: Arabic under /ar, English otherwise. */
export function usePageLocale(): Locale {
  const pathname = usePathname() ?? '';
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
}

function Shell({ title, badge, locale, children }: { title: string; badge: string; locale: Locale; children: React.ReactNode }) {
  return (
    <div className="relative" dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-slate-100/80 via-slate-50/40 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <span className="text-[12px] font-semibold tracking-[-0.01em] text-slate-700">{title}</span>
          <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white">{badge}</span>
        </div>
        <div className="p-6 sm:p-7">{children}</div>
      </div>
    </div>
  );
}

function WidgetExample({ locale, sample }: { locale: Locale; sample: Sample }) {
  const t = T[locale];
  return (
    <Shell title={t.widgetTitle} badge={t.example} locale={locale}>
      <p className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">{sample.trip}</p>
      <p className="mt-0.5 text-[12.5px] text-slate-500">{sample.option}</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-slate-200 px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400"><CalendarDays className="h-3 w-3" />{t.date}</p>
          <p className="mt-1 text-[13px] font-semibold text-slate-900">{t.dateValue}</p>
        </div>
        <div className="rounded-xl border border-slate-200 px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400"><Users className="h-3 w-3" />{t.guests}</p>
          <p className="mt-1 text-[13px] font-semibold text-slate-900">{t.guestsValue}</p>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400"><Clock className="h-3 w-3" />{t.departure}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {sample.times.map((time, i) => (
          <div
            key={time}
            className={`rounded-xl border px-2 py-2.5 text-center ${i === 1 ? 'border-slate-900 bg-slate-900 text-white' : i === 2 ? 'border-slate-200 bg-slate-50 text-slate-400' : 'border-slate-200 text-slate-900'}`}
          >
            <p className="text-[13px] font-semibold" dir="ltr">{time}</p>
            <p className={`mt-0.5 text-[10px] font-medium ${i === 1 ? 'text-white/80' : 'text-slate-400'}`}>{i === 1 ? t.left : i === 2 ? t.full : ' '}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-red-600 px-4 py-3 text-center text-[13.5px] font-semibold text-white">{t.reserve}</div>
      <p className="mt-3 text-[12px] leading-[1.55] text-slate-500">{t.reserveNote}</p>
    </Shell>
  );
}

function VoucherExample({ locale, sample }: { locale: Locale; sample: Sample }) {
  const t = T[locale];
  const icons = [Mail, QrCode, Clock];
  return (
    <Shell title={t.voucherTitle} badge={t.example} locale={locale}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">{sample.trip}</p>
          <p className="mt-0.5 text-[12.5px] text-slate-500">{sample.ref} · {t.dateValue} · <span dir="ltr">{sample.times[1]}</span></p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-emerald-700 ring-1 ring-emerald-100">{t.confirmed}</span>
      </div>
      <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200">
        {t.rows.map((label, i) => (
          <div key={label} className="flex items-center justify-between gap-4 px-3.5 py-2.5">
            <dt className="text-[12px] font-medium text-slate-500">{label}</dt>
            <dd className="text-[12.5px] font-semibold text-slate-900">{t.rowValues[i]}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-4 space-y-2">
        {t.sent.map((line, i) => {
          const Icon = icons[i];
          return (
            <li key={line} className="flex items-center gap-2.5 text-[12.5px] font-medium text-slate-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700"><Icon className="h-3.5 w-3.5" strokeWidth={1.8} /></span>
              {line}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[12px] text-slate-500">{t.languages}</p>
    </Shell>
  );
}

function DayBoardExample({ locale, sample }: { locale: Locale; sample: Sample }) {
  const t = T[locale];
  const counts = [3, 2, 1, 4];
  return (
    <Shell title={t.boardTitle} badge={t.example} locale={locale}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {t.stages.map((stage, i) => (
          <div key={stage} className={`rounded-xl border px-3 py-2.5 ${i === 0 ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-900'}`}>
            <p className="text-[18px] font-extrabold leading-none tracking-[-0.02em]">{counts[i]}</p>
            <p className={`mt-1.5 text-[10.5px] font-semibold leading-tight ${i === 0 ? 'text-white/85' : 'text-slate-500'}`}>{stage}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
            <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${row < 2 ? 'border-slate-900 bg-slate-900' : 'border-slate-300 bg-white'}`}>
              {row < 2 && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-semibold text-slate-900">{sample.trip} · <span dir="ltr">{sample.times[row]}</span></p>
              <p className="text-[11.5px] text-slate-500">{t.booking} {row + 1} · {row === 2 ? t.waiting : t.assigned}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5">
        <span className="text-[12px] font-medium text-slate-500">{t.selected}</span>
        <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11.5px] font-semibold text-white">{t.move}</span>
      </div>
      <p className="mt-3 text-[12px] text-slate-500">{t.boardNote}</p>
    </Shell>
  );
}

/** Example panel for the nth "what it does today" row: 0 widget, 1 confirmation and voucher, 2 day board. */
export function BookingExample({ variant, trade }: { variant: number; trade: Trade }) {
  const locale = usePageLocale();
  const sample = SAMPLES[locale][trade];
  if (variant === 0) return <WidgetExample locale={locale} sample={sample} />;
  if (variant === 1) return <VoucherExample locale={locale} sample={sample} />;
  return <DayBoardExample locale={locale} sample={sample} />;
}

const REASSURANCE: Record<Locale, { points: [string, string, string]; team: string; teamSub: string }> = {
  en: {
    points: [
      'Every request is read by our team',
      'A demo with your own trips and prices',
      'We use your details only to reply to this request',
    ],
    team: 'Foxes Technology team',
    teamSub: 'Replies in Arabic or English',
  },
  ar: {
    points: ['يقرأ فريقنا كل طلب', 'عرض برحلاتك وأسعارك أنت', 'نستخدم بياناتك للرد على هذا الطلب فقط'],
    team: 'فريق Foxes Technology',
    teamSub: 'يرد بالعربية أو الإنجليزية',
  },
};

/** What a visitor can expect after sending the enquiry form. No named person, no reply-time promise. */
export function LeadReassurance({ locale }: { locale: Locale }) {
  const t = REASSURANCE[locale];
  const icons = [Mail, CalendarDays, ShieldCheck];
  return (
    <>
      <div className="mt-12 space-y-5">
        {t.points.map((text, i) => {
          const Icon = icons[i];
          return (
            <div key={text} className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700">
                <Icon className="h-4 w-4" strokeWidth={1.7} />
              </div>
              <p className="pt-1.5 text-[15px] font-medium text-slate-700">{text}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-12 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-[13px] font-semibold text-white">F</div>
          <div>
            <p className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">{t.team}</p>
            <p className="text-[12.5px] text-slate-500">{t.teamSub}</p>
          </div>
        </div>
      </div>
    </>
  );
}
