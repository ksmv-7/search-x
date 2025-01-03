import { createContext, useState, FC, ReactNode } from "react";
import { SearchContextProps } from "../../../types/search/types";

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const addToHistory = (query: string) => {
    setSearchHistory((prev) =>
      prev.includes(query) ? prev : [...prev, query]
    );
  };

  const removeFromHistory = (query: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== query));
  };

  const value: SearchContextProps = {
    searchHistory,
    addToHistory,
    removeFromHistory,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};