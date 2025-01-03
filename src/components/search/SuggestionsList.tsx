import React, { FC } from "react";
import { SearchItem } from "../../types/search/types";
import { styles } from "../../styles/search/styles";
import { SuggestionItem } from "./SuggestionItem";

type SuggestionsListProps = {
  suggestions: SearchItem[];
  searchHistory: string[];
  handleSelectSuggestion: (item: SearchItem) => void;
  handleRemoveHistory: (itemToRemove: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SuggestionsList: FC<SuggestionsListProps> = ({
  suggestions,
  searchHistory,
  handleSelectSuggestion,
  handleRemoveHistory,
}) => {
  const sortedSuggestions = suggestions
    .slice()
    .sort((a, b) => {
      const aInHistory = searchHistory.includes(a.title);
      const bInHistory = searchHistory.includes(b.title);
      if (aInHistory && !bInHistory) return -1;
      if (!aInHistory && bInHistory) return 1;
      return 0;
    });

  return (
    <div style={styles.suggestions}>
      {
        sortedSuggestions.map((item) => {
          const inHistory = searchHistory.includes(item.title);
          return (
            <SuggestionItem
              key={item.title}
              item={item}
              inHistory={inHistory}
              handleSelectSuggestion={handleSelectSuggestion}
              handleRemoveHistory={handleRemoveHistory}
            />
          );
      })}
    </div>
  );
};