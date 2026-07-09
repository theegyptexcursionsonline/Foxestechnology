'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp, FileQuestion, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchClient, ALGOLIA_INDEX_NAME, SearchHit } from '@/lib/algolia';
import { InstantSearch, useSearchBox, useHits, Configure } from 'react-instantsearch';

// Popular searches for suggestions
const popularSearches = [
  'Online booking',
  'POS hardware',
  'AI assistant',
  'Mobile apps',
  'Analytics',
  'Pricing plans',
];

interface SearchResultsProps {
  onResultClick?: () => void;
  inline?: boolean;
}

function SearchResults({ onResultClick, inline = false }: SearchResultsProps) {
  const { hits } = useHits<SearchHit>();
  const router = useRouter();

  const handleResultClick = (url: string) => {
    router.push(url);
    onResultClick?.();
  };

  // No results state
  if (hits.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className={inline ? "" : "absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"}
      >
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FileQuestion className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No results found</h3>
          <p className="text-sm text-gray-600 mb-4">
            We couldn&apos;t find any matches for your search. Try different keywords.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularSearches.slice(0, 3).map((search) => (
              <button
                key={search}
                onClick={() => handleResultClick('/search')}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={inline ? "max-h-[450px] overflow-hidden" : "absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[450px] overflow-hidden z-50"}
    >
      <div className="overflow-y-auto max-h-[400px] overscroll-contain search-results-scroll">
        <div className={inline ? "space-y-1" : "p-2"}>
          {hits.slice(0, 6).map((hit, index) => (
            <motion.button
              key={hit.objectID}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleResultClick(hit.url)}
              className="w-full text-left p-4 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-xl transition-all duration-200 group border border-transparent hover:border-red-100"
            >
              <div className="flex items-start gap-4">
                {hit.image && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 ring-2 ring-gray-100 group-hover:ring-red-200 transition-all">
                    <img
                      src={hit.image}
                      alt={hit.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4
                      className="font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1 text-base"
                      dangerouslySetInnerHTML={{
                        __html: hit._highlightResult?.title?.value || hit.title,
                      }}
                    />
                    <span className="text-xs px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full capitalize flex-shrink-0 font-medium border border-gray-200">
                      {hit.category}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-600 line-clamp-2 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult?.description?.value || hit.description,
                    }}
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {hits.length > 6 && (
        <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <button
            onClick={() => handleResultClick('/search')}
            className="w-full px-4 py-3 text-sm text-red-600 hover:text-red-700 font-semibold flex items-center justify-center gap-2 group transition-all"
          >
            <span>View all {hits.length} results</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </div>
      )}
    </motion.div>
  );
}

interface SearchInputProps {
  onResultClick?: () => void;
  inline?: boolean;
  showPopularSearches?: boolean;
}

function SearchInput({ onResultClick, inline = false, showPopularSearches = true }: SearchInputProps) {
  const { query, refine, clear } = useSearchBox();
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onResultClick?.();
    }
  };

  return (
    <div className={inline ? "" : "relative"}>
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => refine(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for solutions, features, pricing..."
            className="w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400"
            autoComplete="off"
            autoFocus={inline}
          />
          {query && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              type="button"
              onClick={clear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </form>

      {!inline && (
        <AnimatePresence>
          {isFocused && query && <SearchResults onResultClick={onResultClick} inline={false} />}
          {isFocused && !query && showPopularSearches && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
            >
              <div className="p-5">
                <div className="flex items-center gap-2.5 text-sm font-bold text-gray-800 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span>Popular Searches</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {popularSearches.map((search, index) => (
                    <motion.button
                      key={search}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => refine(search)}
                      className="text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100 group"
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
                        <span>{search}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {inline && (isFocused || query) && (
        <AnimatePresence>
          {query ? (
            <SearchResults onResultClick={onResultClick} inline={true} />
          ) : showPopularSearches ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <div className="flex items-center gap-2.5 text-sm font-bold text-gray-800 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span>Popular Searches</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {popularSearches.map((search, index) => (
                  <motion.button
                    key={search}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => refine(search)}
                    className="text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100 group"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
                      <span>{search}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </div>
  );
}

interface SearchBarProps {
  className?: string;
  onResultClick?: () => void;
  inline?: boolean;
  showPopularSearches?: boolean;
}

export default function SearchBar({ className = '', onResultClick, inline = false, showPopularSearches = true }: SearchBarProps) {
  // If search client is not configured, show a message
  if (!searchClient) {
    return (
      <div className={`w-full max-w-2xl ${className}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            disabled
            placeholder="Search not configured. Add Algolia credentials to .env.local"
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={inline ? className : `w-full max-w-2xl ${className}`}>
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
        <Configure hitsPerPage={20} />
        <SearchInput onResultClick={onResultClick} inline={inline} showPopularSearches={showPopularSearches} />
      </InstantSearch>
    </div>
  );
}
