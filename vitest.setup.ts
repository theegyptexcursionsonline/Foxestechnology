import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock next/font/google — the font loaders only run inside Next's build/runtime,
// so under vitest they must return a stub with the className/variable shape the
// components spread onto elements.
vi.mock('next/font/google', () => {
  const fontLoader = () => ({
    className: 'mock-font',
    variable: '--mock-font',
    style: { fontFamily: 'mock-font' },
  });
  // Any font name resolves to the loader, but `then` must stay undefined: a module object
  // that answers `then` looks like a promise to the module loader, and importing a file
  // that uses next/font (e.g. the coming-soon page) would then wait forever. `has` mirrors
  // `get` so Vitest's named-export check accepts every font name.
  const isFont = (prop: string | symbol) => typeof prop === 'string' && prop !== 'then';
  return new Proxy(
    {},
    {
      get: (_target, prop) => (isFont(prop) ? fontLoader : undefined),
      has: (_target, prop) => isFont(prop),
    },
  );
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock framer-motion
//
// jsdom can't run the real animation engine, so we swap motion.* for plain DOM
// elements and give the motion-value hooks (useSpring/useTransform/useScroll) a
// minimal MotionValue shape. Components render motion values directly as children
// (e.g. <motion.span>{useTransform(...)}</motion.span>), so the mock resolves any
// motion-value child to its current value before rendering — otherwise React
// throws "Objects are not valid as a React child".
vi.mock('framer-motion', async () => {
  const React = await import('react');

  const MOTION_VALUE = Symbol.for('framer-motion.mock.motionValue');

  const createMotionValue = (initial: any) => {
    let current = initial;
    return {
      [MOTION_VALUE]: true,
      get: () => current,
      set: (next: any) => {
        current = next;
      },
      on: () => () => {},
      destroy: () => {},
    };
  };

  const isMotionValue = (value: any) => Boolean(value && value[MOTION_VALUE]);

  const resolveChildren = (children: any): any => {
    if (isMotionValue(children)) return String(children.get());
    if (Array.isArray(children)) return children.map(resolveChildren);
    return children;
  };

  // One component per tag, like the real library: building a new component on every
  // `motion.div` access would give it a new identity on each render, so React would remount
  // the subtree whenever state changes (e.g. while typing into a form inside it).
  const motionComponents = new Map<PropertyKey, unknown>();

  return {
    motion: new Proxy(
      {},
      {
        get: (_, prop) => {
          const cached = motionComponents.get(prop);
          if (cached) return cached;
          const Component = React.forwardRef<any, any>(({ children, ...props }: any, ref: any) => {
            // Filter out framer-motion specific props
            const {
              initial,
              animate,
              exit,
              transition,
              variants,
              whileHover,
              whileTap,
              whileInView,
              viewport,
              onAnimationStart,
              onAnimationComplete,
              drag,
              dragConstraints,
              dragElastic,
              onDragStart,
              onDragEnd,
              custom,
              layout,
              layoutId,
              style,
              ...rest
            } = props;
            return React.createElement(prop as string, { ...rest, ref, style }, resolveChildren(children));
          });
          Component.displayName = `motion.${String(prop)}`;
          motionComponents.set(prop, Component);
          return Component;
        },
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
      set: vi.fn(),
    }),
    useInView: () => true,
    useScroll: () => ({
      scrollY: createMotionValue(0),
      scrollYProgress: createMotionValue(0),
    }),
    useMotionValue: (initial: any) => createMotionValue(initial),
    useTransform: (input: any, transformer?: any) => {
      if (typeof transformer === 'function' && isMotionValue(input)) {
        return createMotionValue(transformer(input.get()));
      }
      return createMotionValue(typeof input === 'function' ? input() : 0);
    },
    useSpring: (source: any) => createMotionValue(isMotionValue(source) ? source.get() : source),
  };
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Algolia
vi.mock('algoliasearch', () => ({
  default: vi.fn(() => ({
    initIndex: vi.fn(() => ({
      search: vi.fn(() => Promise.resolve({ hits: [] })),
      saveObjects: vi.fn(() => Promise.resolve({})),
      setSettings: vi.fn(() => Promise.resolve({})),
    })),
  })),
}));
