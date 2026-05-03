'use client';

import { useEffect } from 'react';

export default function RTLProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    const previousDir = html.getAttribute('dir');
    const previousLang = html.getAttribute('lang');
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    return () => {
      if (previousDir) html.setAttribute('dir', previousDir);
      else html.removeAttribute('dir');
      if (previousLang) html.setAttribute('lang', previousLang);
      else html.setAttribute('lang', 'en');
    };
  }, []);

  return (
    <div dir="rtl" lang="ar" className="font-tajawal">
      {children}
    </div>
  );
}
