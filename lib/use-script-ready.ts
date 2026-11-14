'use client';

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

/**
 * False in the HTML the server sends, true once the page's script has attached to it.
 *
 * The site's forms arrive as HTML, so on a slow connection a visitor can press Enter or the
 * button before the script has loaded. The browser then submits the form itself: a plain GET to
 * the same page, which puts every named field (name, email, phone) in the address bar, the
 * browser history and the host's request logs, and reloads the page empty. Forms keep their
 * submit button disabled until this is true; typing is still allowed (see useAdoptTypedValues).
 */
export function useScriptReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

/**
 * Takes what a visitor typed into the server-sent fields before the script attached, once, at the
 * moment it attaches.
 *
 * React keeps the typed text on screen when it attaches, but the form's state starts empty, and
 * the next redraw for any reason (a timer, the page reading its address, the button above turning
 * on) writes that empty state back over the field (found 14 Nov 2026). A layout effect runs
 * before any of those redraws, so the state holds what the visitor sees before anything can
 * overwrite it.
 */
export function useAdoptTypedValues<T extends HTMLElement>(ref: RefObject<T | null>, adopt: (root: T) => void): void {
  const adoptOnce = useRef(adopt);
  useLayoutEffect(() => {
    if (ref.current) adoptOnce.current(ref.current);
  }, [ref]);
}

/** The current value of a field inside `root`, or '' when there is none. */
export function fieldValue(root: ParentNode, selector: string): string {
  const el = root.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(selector);
  return el?.value ?? '';
}
