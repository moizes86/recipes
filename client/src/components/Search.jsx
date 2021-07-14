import React, { useState, useEffect } from "react";
import { onSetRecipes } from "../redux/actions";
import { searchRecipe } from "../services/API_Services/RecipeAPI";
import { useDispatch } from "react-redux";

import SearchAutoComplete from "./SearchAutoComplete";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (query.length) {
        const searchResult = await searchRecipe(query);
        setResults(searchResult.data);
      } else {
        setResults([]);
      }
    }, 1000);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await searchRecipe(query);
    dispatch(onSetRecipes(result.data));
  };
  return (
    <form className="search-recipe" onSubmit={handleSubmit}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipe..."
          name="searchRecipe"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          onFocus={() => setInputIsFocused(true)}
          onBlur={() =>
            setTimeout(() => {
              setInputIsFocused(false);
            }, 200)
          }
        />
        <div className="icon">
          <i className="fa fa-search" />
        </div>
      </div>

      <SearchAutoComplete results={results} inputIsFocused={inputIsFocused} />
    </form>
  );
};

export default Search;
