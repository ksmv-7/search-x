import { createContext, useState, useContext, FC, ReactNode } from "react";
import { SearchContextProps } from "../../types/search/types";

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

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

// 3) Hook to access the context
export const useSearchContext = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
