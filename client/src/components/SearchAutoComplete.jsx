import React from "react";

const SearchAutoComplete = ({ results, inputIsFocused }) => {
  return (
    <div className={`search-auto-complete ${!inputIsFocused && "display-none"} ${!results.length && "transparent"}`}>
      <ul>
        {results.map((result) => (
          <li key={`${result.title}-${result.id}`} id={result.id}>
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAutoComplete;
