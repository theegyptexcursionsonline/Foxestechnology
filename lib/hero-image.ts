/**
 * Display width of the photo at the top of each product page, for the browser's choice of file.
 *
 * Without it the browser fetched the photo for its full 1400 px layout width at the screen's
 * pixel density: 1920 px wide on a desktop and 3840 px on a phone, for a slot about 600 px wide
 * on a desktop and the screen's width on a phone. It was the slowest part of the first screen
 * (largest paint 3.3–3.9 s on the Arabic boat page, 15 Nov 2026). The hero sits in the right
 * column (about 600 px) from the lg breakpoint, and full width below it.
 */
export const HERO_IMAGE_SIZES = '(min-width: 1024px) 600px, 100vw';
