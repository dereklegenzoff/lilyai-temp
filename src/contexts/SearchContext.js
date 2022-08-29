import { createContext, useContext } from 'react';

// Create new auth context
export const SearchContext = createContext({
    isSemantic: false,
    setIsSemantic: () => {},
    searchQueryLanguage: false,
    setSearchQueryLanguage: () => {},
    isLilyAI: false,
    setIsLilyAI: () => {},
});

// React hook to use auth context
export function useSearch() {
    return useContext(SearchContext);
}
