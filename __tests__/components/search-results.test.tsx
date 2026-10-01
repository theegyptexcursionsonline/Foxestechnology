/**
 * Regression: the header search crashed the whole page on the first keystroke.
 *
 * The live index returns records whose `category` (and `destination`) are populated
 * references — `{ _id, name }` objects, sometimes with an empty name — and which carry no
 * `url`. Rendering `{hit.category}` threw React error #31. These records are copied from
 * the live index's shape (values trimmed) so the test fails the way production did.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SearchBar from '@/components/SearchBar';

const state = vi.hoisted(() => ({ hits: [] as unknown[], push: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: state.push, replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/solutions/kiosk',
  useSearchParams: () => new URLSearchParams(),
}));

// Keep the real helpers in lib/algolia; only pretend a client is configured.
vi.mock('@/lib/algolia', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/algolia')>()),
  searchClient: {},
}));

vi.mock('react-instantsearch', () => ({
  InstantSearch: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Configure: () => null,
  useSearchBox: () => ({ query: 'p', refine: vi.fn(), clear: vi.fn() }),
  useHits: () => ({ hits: state.hits }),
}));

/** Shape of the records the live index returned on 2026-10-01. */
const LIVE_TOUR_RECORD = {
  objectID: '694434f7b8fbec8950182d75',
  title: 'Private Speedboat Charter',
  slug: 'private-speedboat-charter',
  description: 'Charter a private speedboat for your group.',
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  images: [],
  tags: ['private', 'charter', 'family'],
  category: { _id: '[object Object],[object Object]', name: '' },
  destination: { _id: '6944345cb8fbec8950182d40', name: 'Hurghada Marina' },
  price: 450,
  discountPrice: 0,
  duration: '4 hours',
  rating: 4.8,
  reviewCount: 12,
  isFeatured: true,
  isPublished: true,
  location: 'Hurghada',
  _highlightResult: { title: { value: '<em>P</em>rivate Speedboat Charter' } },
};

const LIVE_TOUR_WITH_NAMED_CATEGORY = {
  ...LIVE_TOUR_RECORD,
  objectID: '694434f7b8fbec8950182d76',
  title: 'Sunset Felucca Ride',
  slug: 'sunset-felucca-ride',
  category: { _id: '6944345cb8fbec8950182d41', name: 'Boat Trips' },
  _highlightResult: undefined,
};

const SITE_PAGE_RECORD = {
  objectID: 'solution-ai-search',
  title: 'AI Search',
  description: 'Search that finds the right tour.',
  content: 'AI Search widget',
  url: '/solutions/ai-search',
  category: 'solutions',
};

function openResults() {
  const input = screen.getByPlaceholderText(/search for solutions/i);
  fireEvent.focus(input);
  return input;
}

beforeEach(() => {
  state.push.mockReset();
});

describe('header search results with the live data shape', () => {
  it('renders object categories instead of crashing the page', () => {
    state.hits = [LIVE_TOUR_RECORD, LIVE_TOUR_WITH_NAMED_CATEGORY, SITE_PAGE_RECORD];
    const { container } = render(<SearchBar />);
    openResults();

    expect(screen.getByText('Sunset Felucca Ride')).toBeInTheDocument();
    expect(screen.getByText('Boat Trips')).toBeInTheDocument();
    expect(screen.getByText('solutions')).toBeInTheDocument();
    expect(container.textContent).not.toContain('[object Object]');
  });

  it('shows no category badge when the reference has no name', () => {
    state.hits = [LIVE_TOUR_RECORD];
    const { container } = render(<SearchBar />);
    openResults();

    expect(container.querySelector('[data-search-category]')).toBeNull();
    expect(container.textContent).not.toContain('[object Object]');
  });

  it('opens results that have an internal page', () => {
    state.hits = [SITE_PAGE_RECORD];
    render(<SearchBar />);
    openResults();

    fireEvent.click(screen.getByText('AI Search'));
    expect(state.push).toHaveBeenCalledWith('/solutions/ai-search');
  });

  it('does not offer a dead link for records without a page on this site', () => {
    state.hits = [LIVE_TOUR_WITH_NAMED_CATEGORY];
    render(<SearchBar />);
    openResults();

    const title = screen.getByText('Sunset Felucca Ride');
    expect(title.closest('button')).toBeNull();
    fireEvent.click(title);
    expect(state.push).not.toHaveBeenCalled();
  });

  it.each([
    ['an external address', 'https://elsewhere.example/tour'],
    ['a protocol-relative address', '//elsewhere.example/tour'],
    ['a script address', 'javascript:alert(1)'],
    ['a non-string url', { href: '/x' }],
  ])('never navigates to %s', (_label, url) => {
    state.hits = [{ ...SITE_PAGE_RECORD, objectID: 'odd', title: 'Odd record', url }];
    render(<SearchBar />);
    openResults();

    const title = screen.getByText('Odd record');
    expect(title.closest('button')).toBeNull();
    fireEvent.click(title);
    expect(state.push).not.toHaveBeenCalled();
  });
});
