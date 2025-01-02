// src/App.tsx

import React, { FC } from "react";
import { SearchProvider } from "./components/search/SearchContext";
import { Search } from "./components/search/Search";

const App: FC = () => {
  return (
    <SearchProvider>
      <div style={styles.appContainer}>
        <Search />
      </div>
    </SearchProvider>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    padding: 20,
    fontFamily: "sans-serif",
    maxWidth: 800,
    margin: "0 auto",
  },
};

export default App;
