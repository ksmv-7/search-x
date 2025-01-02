import { FC } from "react";
import { SearchItem } from "../../types/search/types";
import { styles } from "../../styles/search/styles";

type SearchResultsProps = {
  results: SearchItem[];
}

export const SearchResults: FC<SearchResultsProps> = ({ results }) => {
  return (
    <div style={styles.results}>
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
  );
};