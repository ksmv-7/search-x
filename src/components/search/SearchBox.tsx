import React, { FC, useState } from "react";
import { SearchItem } from "../../types/search/types";
import { styles } from "../../styles/search/styles";
import { SuggestionsList } from "./SuggestionsList";
import { MagnifierIcon, MicrophoneIcon, RemoveSearchResultIcon } from "./icons";

type SearchBoxProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  shouldShowSuggestions: boolean;
  suggestions: SearchItem[];
  searchHistory: string[];
  handleSelectSuggestion: (item: SearchItem) => void;
  handleRemoveHistory: (itemToRemove: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SearchBox: FC<SearchBoxProps> = ({
  query,
  setQuery,
  inputRef,
  handleKeyDown,
  handleClear,
  shouldShowSuggestions,
  suggestions,
  searchHistory,
  handleSelectSuggestion,
  handleRemoveHistory,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };

  return (
    <div style={styles.searchBox}>
      <span style={styles.searchIcon}>
        <MagnifierIcon />
      </span>

      <input
        ref={inputRef}
        style={styles.searchInput}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search..."
      />

      {query && (
        <span style={styles.clearIcon} onClick={handleClear}>
          <RemoveSearchResultIcon height={15} width={15} />
        </span>
      )}

      <span style={styles.microphoneIcon}>
        <MicrophoneIcon />
      </span>

      {shouldShowSuggestions && isFocused && (
        <SuggestionsList
          suggestions={suggestions}
          searchHistory={searchHistory}
          handleSelectSuggestion={handleSelectSuggestion}
          handleRemoveHistory={handleRemoveHistory}
        />
      )}
    </div>
  );
};