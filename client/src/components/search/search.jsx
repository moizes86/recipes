import React, { useState } from "react";
import { onSetRecipes } from "../../redux/actions";
import { searchRecipe } from "../../services/API_Services/RecipeAPI";
import { useDispatch } from "react-redux";

import "./search.scss";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await searchRecipe(query);
    dispatch(onSetRecipes(result.data));
  };
  return (
    <form className="search-recipe" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Search recipe..."
        name="searchRecipe"
        value={query}
        onChange={handleChange}
      />
      <button>Seach</button>
    </form>
  );
};

export default Search;
