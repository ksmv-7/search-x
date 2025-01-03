import React, { FC, useState, useEffect, useCallback, useRef } from "react";
import { useDebounce } from "../../hooks/common/hooks";
import { SearchItem } from "../../types/search/types";
import { MOCK_DB } from "../../database/mockDatabase";
import { styles } from "../../styles/search/styles";
import { SearchBox } from "./SearchBox";
import { SearchResults } from "./SearchResults";
import { useSearchContext } from "../../hooks/search/hooks";

export const Search: FC = () => {
  const { searchHistory, addToHistory, removeFromHistory } = useSearchContext();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce({ value: query, delay: 200 });
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchTime, setSearchTime] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const shouldShowSuggestions = suggestions.length > 0;

  const isSelectingRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = MOCK_DB.filter((item) =>
      item.title.toLowerCase().startsWith(debouncedQuery.toLowerCase())
    ).slice(0, 10);
    setSuggestions(filteredSuggestions);
  }, [debouncedQuery]);

  const performSearch = useCallback((text: string) => {
    if (!text.trim()) {
      return;
    }

    const startTime = performance.now();
    const filteredResults = MOCK_DB.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    const endTime = performance.now();
    setSearchTime(endTime - startTime);
    setResults(filteredResults);
    setHasSearched(true);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(query);
      addToHistory(query);
      setSuggestions([]);
    }
  }, [performSearch, query, addToHistory]);

  const handleSelectSuggestion = useCallback((item: SearchItem) => {
    isSelectingRef.current = true;
    setQuery(item.title);
    performSearch(item.title);
    addToHistory(item.title);
    setSuggestions([]);
  }, [performSearch, addToHistory]);

  const handleClear = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    setResults([]);
    inputRef.current?.focus();
    setHasSearched(false);
  }, []);

  const handleRemoveHistory = useCallback((itemToRemove: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFromHistory(itemToRemove);
  }, [removeFromHistory]);

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>SearchX</h1>

      <SearchBox
        query={query}
        setQuery={setQuery}
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
        handleClear={handleClear}
        shouldShowSuggestions={shouldShowSuggestions}
        suggestions={suggestions}
        searchHistory={searchHistory}
        handleSelectSuggestion={handleSelectSuggestion}
        handleRemoveHistory={handleRemoveHistory}
      />

      <SearchResults
        results={results}
        searchTime={searchTime}
        resultCount={results.length}
        hasSearched={hasSearched}
      />
    </div>
  );
};
