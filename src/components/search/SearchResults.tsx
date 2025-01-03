import { FC } from "react";
import { SearchItem } from "../../types/search/types";
import { styles } from "../../styles/search/styles";

type SearchResultsProps = {
  results: SearchItem[];
  searchTime: number;
  resultCount: number;
  hasSearched: boolean;
}

export const SearchResults: FC<SearchResultsProps> = ({ results, searchTime, resultCount, hasSearched }) => {
  if (!hasSearched) {
    return null;
  }

  if (resultCount === 0) {
    return (
      <div style={styles.resultsContainer}>
        <div style={styles.metadataContainer}>
          <div style={styles.metadata}>
            No results found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.resultsContainer}>
      <div style={styles.metadataContainer}>
        <div style={styles.metadata}>
          {resultCount} result{resultCount !== 1 ? "s" : ""} found in {searchTime.toFixed(2)} ms
        </div>
      </div>
      
      <div style={styles.resultsList}>
        {results.map((item) => (
          <div key={item.title} style={styles.resultItem}>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              style={styles.resultTitle}
            >
              {item.title}
            </a>
            <p style={styles.resultDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};