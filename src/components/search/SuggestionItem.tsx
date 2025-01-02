import React, { FC } from "react";
import { SearchItem } from "../../types/search/types";
import { styles } from "../../styles/search/styles";
import { SearchHistoryIcon } from "./icons/SearchHistoryIcon";
import { MagnifierIcon } from "./icons/MagnifierIcon";

type SuggestionItemProps = {
  item: SearchItem;
  inHistory: boolean;
  handleSelectSuggestion: (item: SearchItem) => void;
  handleRemoveHistory: (itemToRemove: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SuggestionItem: FC<SuggestionItemProps> = ({
  item,
  inHistory,
  handleSelectSuggestion,
  handleRemoveHistory,
}) => {
  return (
    <div
      style={{
        ...styles.suggestionItem,
        backgroundColor: "white",
        color: inHistory ? "purple" : "black",
      }}
      onClick={() => handleSelectSuggestion(item)}
    >
      <span style={{ marginRight: "8px" }}>
        {inHistory ? <SearchHistoryIcon /> : <MagnifierIcon />}
      </span>
      <span>{item.title}</span>

      {inHistory && (
        <button
          style={styles.removeHistoryBtn}
          onClick={(e) => handleRemoveHistory(item.title, e)}
        >
          Премахване
        </button>
      )}
    </div>
  );
};