import { useContext } from "react";
import { SearchContextProps } from "../../types/search/types";
import { SearchContext } from "../../components/search/context/SearchContext";

export const useSearchContext = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};