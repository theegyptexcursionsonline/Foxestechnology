'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Currency } from '@/lib/currency';
import { DEFAULT_CURRENCY } from '@/lib/currency';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = 'foxes:operator-currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'USD' || saved === 'EGP' || saved === 'EUR') {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, c);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  // Graceful fallback if used outside provider — return default + noop setter.
  if (!ctx) return { currency: DEFAULT_CURRENCY, setCurrency: () => {} };
  return ctx;
}
