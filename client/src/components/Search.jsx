import React, { useState, useEffect } from "react";
import { onSetRecipes } from "../redux/actions";
import { getRecipes, searchRecipe } from "../services/API_Services/RecipeAPI";
import { useDispatch } from "react-redux";

import SearchAutoComplete from "./SearchAutoComplete";
import useFetch from "../useFetch";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const { sendRequest, loading, data, error, Spinner } = useFetch();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.length) {
        sendRequest(searchRecipe, query);
      } else {
        setResults([]);
      }
    }, 1000);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  useEffect(() => {
    setResults(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (results) dispatch(onSetRecipes(results));
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
          {loading ? (
              <Spinner />
          ) : (
            <i
              className="fa fa-search"
              onClick={(e) => {
                handleSubmit(e);
                document.querySelector(".gallery").scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          )}
        </div>
      </div>

      <SearchAutoComplete results={results} inputIsFocused={inputIsFocused} />
    </form>
  );
};

export default Search;
