import algoliasearch from 'algoliasearch/lite';
import type { SearchClient } from 'instantsearch.js';

// Algolia configuration - only initialize if credentials are available
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '';

// The v4 lite client is runtime-compatible with react-instantsearch v7, but its
// SearchClient type differs slightly (getRecommendations signature). Cast once here
// so every consumer gets the type InstantSearch expects.
export const searchClient: SearchClient | null = appId && apiKey
  ? (algoliasearch(appId, apiKey) as unknown as SearchClient)
  : null;

export const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'foxes_technology';

// Search configuration
export const searchConfig = {
  indexName: ALGOLIA_INDEX_NAME,
  hitsPerPage: 10,
  attributesToSnippet: ['content:20', 'description:30'],
  snippetEllipsisText: '...',
};

/** A populated reference as stored by the catalogue sync, e.g. a category or destination. */
export interface SearchReference {
  _id?: string;
  name?: string;
}

/**
 * A record from the search index. The index holds two shapes: site pages (string category and
 * an internal `url`) and catalogue records synced from the booking platform, whose `category`
 * is a `{ _id, name }` reference and which have no page on this site. Render fields through
 * the helpers below rather than directly — rendering a reference object crashes the page.
 */
export interface SearchHit {
  objectID: string;
  title?: string;
  description?: string;
  content?: string;
  url?: unknown;
  category?: string | SearchReference | null;
  tags?: unknown[];
  image?: string;
  _highlightResult?: {
    title?: { value: string };
    description?: { value: string };
    content?: { value: string };
  };
}

/** Text for a field that may be a plain string or a `{ name }` reference; empty when there is none. */
export function searchHitLabel(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (value && typeof value === 'object' && 'name' in value) {
    const { name } = value as { name?: unknown };
    return typeof name === 'string' ? name.trim() : '';
  }
  return '';
}

/** A string field's value, or an empty string when the record holds something else. */
export function searchHitText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/**
 * The page on this site a result opens, or null when it has none. Only same-site paths are
 * allowed — never an external, protocol-relative or script address.
 */
export function searchHitHref(hit: Pick<SearchHit, 'url'>): string | null {
  if (typeof hit.url !== 'string') return null;
  const url = hit.url.trim();
  if (!url.startsWith('/') || url.startsWith('//') || url.startsWith('/\\')) return null;
  return url;
}

// Search categories for filtering
export const searchCategories = [
  { label: 'All', value: '' },
  { label: 'Solutions', value: 'solutions' },
  { label: 'Features', value: 'features' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Resources', value: 'resources' },
  { label: 'Company', value: 'company' },
];
