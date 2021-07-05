import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import RecipeDetails from "../recipe-details/recipe-details";

import { AppBackgroundImage } from "./app-background-img.styled";
import "./recipe.scss";

const Recipe = () => {
  const recipe = useSelector((state) => state.search.recipe);
  return (
    <div className="main-container p-5 mb-5">
      <div className="row">
        <div className="col-md-6">
          <img src={recipe.image} alt="" />
          <AppBackgroundImage img={recipe.image} />
        </div>
        <div className="col-md-6">
          <RecipeDetails recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
