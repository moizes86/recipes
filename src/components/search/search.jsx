import React from "react";

import "./search.scss";

const Search = () => {
  return (
    <form className="search-recipe">
      <div className="radios">
        <div>
          <input type="radio" id="mostPopular" name="searchOptions" value="mostPopular" />
          <label htmlFor="mostPopular">Most Popular</label>
        </div>
        <div>
          <input type="radio" id="newest" name="searchOptions" value="newest" />
          <label htmlFor="newest">Newest</label>
        </div>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Search recipe..."
        name="searchRecipe"
      />
    </form>
  );
};

export default Search;
