import React, { useState, useEffect } from "react";

// Components
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";

// STYLES
import "../styles/styles.scss";

import { useParams } from "react-router-dom";
import { getRecipe } from "../services/API_Services/RecipeAPI";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(true);
  const getRecipeAsync = async (id) => {
    const result = await getRecipe(id);
    setRecipe(result.data);
    setLoading(false);
  };
  useEffect(() => {
    getRecipeAsync(id);
  }, [id]);
  return (
    <div className="recipe-page py-5">
      {!loading && (
        <>
          <div className="row">
            <div className="col-sm-6">
              <img src={`${process.env.REACT_APP_SERVER_PATH}/${recipe.image_url}`} alt="" />
              <img className="background-img" src={`${process.env.REACT_APP_SERVER_PATH}/${recipe.image_url}`} alt="" />
            </div>

            <div className="col-sm-6">
              <RecipeDetails
                title={recipe.title}
                description={recipe.description}
                source={recipe.source}
                sourceUrl={recipe.source_url}
                cook={recipe.cook}
                servings={recipe.servings}
                dietsSelected={recipe.dietsSelected}
                categoriesSelected={recipe.categoriesSelected}
              />
            </div>
          </div>

          <div className="px-3">
            <div className="mt-5">
              <RecipeIngredients ingredients={recipe.ingredients} />
            </div>
            <div className="my-4" />
            <h5>Instructions</h5>

            <RecipeInstructions instructions={recipe.instructions} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipePage;
