import Link from 'next/link';
import { MessageCircle, UserPlus } from 'lucide-react';

interface ContactButtonProps {
  /** wa.me link from lib/whatsapp.ts, or null when no real WhatsApp number is configured. */
  whatsappHref: string | null;
  whatsappLabel: string;
  /** Where to send the visitor when there is no WhatsApp number (the request-access page). */
  fallbackHref: string;
  fallbackLabel: string;
  className: string;
  whatsappIconClassName?: string;
  fallbackIconClassName?: string;
  /** Class for the visible label, e.g. to show only the icon on narrow screens. */
  labelClassName?: string;
  /** Set when the label can be visually hidden, so the control keeps an accessible name. */
  withAriaLabel?: boolean;
  onClick?: () => void;
}

/**
 * Secondary contact call to action: opens WhatsApp when a real number is configured,
 * otherwise sends the visitor to request access. Never renders a dead WhatsApp link.
 */
export default function ContactButton({
  whatsappHref,
  whatsappLabel,
  fallbackHref,
  fallbackLabel,
  className,
  whatsappIconClassName = 'h-4 w-4 text-emerald-400',
  fallbackIconClassName = 'h-4 w-4',
  labelClassName,
  withAriaLabel = false,
  onClick,
}: ContactButtonProps) {
  if (whatsappHref) {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={withAriaLabel ? whatsappLabel : undefined}
        onClick={onClick}
        data-contact="whatsapp"
      >
        <MessageCircle className={whatsappIconClassName} />
        <span className={labelClassName}>{whatsappLabel}</span>
      </a>
    );
  }

  return (
    <Link
      href={fallbackHref}
      className={className}
      aria-label={withAriaLabel ? fallbackLabel : undefined}
      onClick={onClick}
      data-contact="request-access"
    >
      <UserPlus className={fallbackIconClassName} />
      <span className={labelClassName}>{fallbackLabel}</span>
    </Link>
  );
}
