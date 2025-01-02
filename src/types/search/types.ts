export type SearchItem = {
  title: string;
  description: string;
  link: string;
}

export type SearchContextProps = {
  searchHistory: string[];
  addToHistory: (query: string) => void;
  removeFromHistory: (query: string) => void;
}