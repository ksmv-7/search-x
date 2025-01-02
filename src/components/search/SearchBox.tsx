import React, { FC } from "react";
import { SearchItem } from "../../types/search/types";
import { styles } from "../../styles/search/styles";
import {MagnifierIcon} from "./icons/MagnifierIcon";
import {MicrophoneIcon} from "./icons/MicrophoneIcon";
import {RemoveSearchResultIcon} from "./icons/RemoveSearchResultIcon";
import { SuggestionsList } from "./SuggestionsList";

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

      {shouldShowSuggestions && (
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