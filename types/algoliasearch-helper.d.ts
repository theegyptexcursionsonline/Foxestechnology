// The installed algoliasearch v4 lite client and the v5 @algolia/client-search
// types (pulled in by react-instantsearch v7) make algoliasearch-helper's
// version-detecting conditional types resolve a PlainSearchParameters shape that
// omits some standard search parameters (e.g. hitsPerPage). These params are valid
// at runtime; declare the ones we use so <Configure> accepts them.
declare module 'algoliasearch-helper' {
  namespace algoliasearchHelper {
    interface PlainSearchParameters {
      hitsPerPage?: number;
      page?: number;
    }
  }
}
