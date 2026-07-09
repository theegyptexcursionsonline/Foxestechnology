// Global analytics helpers injected by third-party snippets (Google Analytics,
// Meta Pixel). Declared here so call sites don't need `as any`.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export {};
