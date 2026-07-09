'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { searchClient, ALGOLIA_INDEX_NAME, SearchHit, searchCategories } from '@/lib/algolia';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Stats,
  Pagination,
  Configure,
  ClearRefinements,
  CurrentRefinements,
  useSearchBox,
} from 'react-instantsearch';

function Hit({ hit }: { hit: SearchHit }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => router.push(hit.url)}
    >
      <div className="flex items-start gap-4">
        {hit.image && (
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={hit.image}
              alt={hit.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors"
              dangerouslySetInnerHTML={{
                __html: hit._highlightResult?.title?.value || hit.title,
              }}
            />
            <span className="text-xs px-2.5 py-1 bg-red-50 text-red-600 rounded-full capitalize font-medium">
              {hit.category}
            </span>
          </div>
          <p
            className="text-gray-600 mb-3 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult?.description?.value || hit.description,
            }}
          />
          <div className="flex items-center gap-2 flex-wrap">
            {hit.tags?.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  // If search client is not configured, show message
  if (!searchClient) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Not Configured</h1>
          <p className="text-lg text-gray-600 mb-8">
            To enable search functionality, please add your Algolia credentials to the .env.local file.
          </p>
          <div className="bg-white rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h2 className="font-bold text-gray-900 mb-4">Setup Instructions:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Sign up for a free account at <a href="https://www.algolia.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">algolia.com</a></li>
              <li>Copy your Application ID and Search API Key</li>
              <li>Create a .env.local file in your project root</li>
              <li>Add your credentials (see .env.local.example for reference)</li>
              <li>Run: npm run algolia:upload</li>
              <li>Restart your development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_INDEX_NAME}
          initialUiState={{
            [ALGOLIA_INDEX_NAME]: {
              query: initialQuery,
            },
          }}
        >
          <Configure hitsPerPage={12} />

          {/* Header Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI-Powered Search</h1>
                <p className="text-gray-600">
                  Find exactly what you&apos;re looking for with intelligent search
                </p>
              </div>
            </motion.div>

            {/* Search Box */}
            <div className="relative">
              <SearchBox
                placeholder="Search for solutions, features, pricing, and more..."
                classNames={{
                  root: 'w-full',
                  form: 'relative',
                  input:
                    'w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all',
                  submit: 'absolute left-4 top-1/2 -translate-y-1/2',
                  reset: 'absolute right-4 top-1/2 -translate-y-1/2',
                  submitIcon: 'w-6 h-6 text-gray-400',
                  resetIcon: 'w-5 h-5 text-gray-400',
                }}
              />
            </div>

            {/* Stats & Current Refinements */}
            <div className="flex items-center justify-between mt-4">
              <Stats
                classNames={{
                  root: 'text-sm text-gray-600',
                }}
              />
              <CurrentRefinements
                classNames={{
                  root: 'flex items-center gap-2',
                  list: 'flex items-center gap-2',
                  item: 'text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-2',
                  label: 'font-medium',
                  category: 'font-normal',
                  delete: 'ml-1 hover:text-red-900',
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h2>
                  <ClearRefinements
                    classNames={{
                      root: 'text-sm text-red-600 hover:text-red-700 font-medium',
                      button: 'hover:underline',
                      disabledButton: 'opacity-50 cursor-not-allowed',
                    }}
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
                  <RefinementList
                    attribute="category"
                    classNames={{
                      root: 'space-y-2',
                      list: 'space-y-2',
                      item: 'flex items-center gap-2',
                      label: 'flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-red-600',
                      checkbox:
                        'w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500',
                      labelText: 'capitalize',
                      count:
                        'ml-auto text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full',
                    }}
                  />
                </div>

                {/* Tags Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
                  <RefinementList
                    attribute="tags"
                    limit={8}
                    showMore={true}
                    classNames={{
                      root: 'space-y-2',
                      list: 'space-y-2',
                      item: 'flex items-center gap-2',
                      label: 'flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-red-600',
                      checkbox:
                        'w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500',
                      labelText: 'capitalize',
                      count:
                        'ml-auto text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full',
                      showMore:
                        'mt-3 text-sm text-red-600 hover:text-red-700 font-medium hover:underline',
                    }}
                  />
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              <Hits
                hitComponent={Hit}
                classNames={{
                  root: 'space-y-4',
                  list: 'space-y-4',
                  item: '',
                }}
              />

              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  classNames={{
                    root: 'flex justify-center',
                    list: 'flex items-center gap-2',
                    item: 'w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors',
                    selectedItem:
                      'bg-red-600 text-white border-red-600 hover:bg-red-700',
                    disabledItem: 'opacity-50 cursor-not-allowed',
                    link: 'w-full h-full flex items-center justify-center',
                  }}
                />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading search...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
