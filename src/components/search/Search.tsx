import React, { FC, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchContext } from "./SearchContext";
import { useDebounce } from "../../hooks/common/hooks";
import { SearchItem } from "../../types/search/types";
import { MOCK_DB } from "../../database/mockDatabase";
import { styles } from "../../styles/search/styles";
import { SearchBox } from "./SearchBox";
import { SearchResults } from "./SearchResults";

export const Search: FC = () => {
  const { searchHistory, addToHistory, removeFromHistory } = useSearchContext();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce({ value: query, delay: 200 });
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [results, setResults] = useState<SearchItem[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const shouldShowSuggestions = useMemo(() => suggestions.length > 0, [suggestions]);

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

    const filteredResults = MOCK_DB.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filteredResults);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(query);
      addToHistory(query);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item: SearchItem) => {
    isSelectingRef.current = true;
    setQuery(item.title);
    performSearch(item.title);
    addToHistory(item.title);
    setSuggestions([]);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setResults([]);
    inputRef.current?.focus();
  };

  const handleRemoveHistory = (
    itemToRemove: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    removeFromHistory(itemToRemove);
  };

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

      <SearchResults results={results} />
    </div>
  );
};