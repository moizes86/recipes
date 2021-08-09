import React from "react";
import { useHistory } from "react-router-dom";

const SearchAutoComplete = ({ results, inputIsFocused }) => {
  const history = useHistory();
  return (
    <div className={`search-auto-complete $ ${!inputIsFocused && "display-none"} ${!results?.length && "transparent"}`}>
      <ul>
        {results && results.map((result) => (
          <li
            key={`${result.title}-${result.id}`}
            id={result.id}
            onClick={(e) => {
              history.push(`/recipes/${result.id??result._id.$oid+'/'+result.title }`);
            }}
          >
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAutoComplete;
