import React, { useState, useEffect } from "react";

// Components
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";

// STYLES
import "../styles/styles.scss";
import { PageBackgroundImage } from "../styles/StyledComponents";

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
    <div className="recipe-page p-5 mb-5">
      {!loading && (
        <>
          <div className="row">
            <div className="col-md-6">
              <img src={recipe.image_url} alt="" />
              <PageBackgroundImage img={recipe.image_url} />
            </div>

            <div className="col-md-6">
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

          <div className="mt-5" />
          <RecipeIngredients ingredients={recipe.ingredients} />
          <div className="mt-4" />
          <RecipeInstructions instructions={recipe.instructions} />
        </>
      )}
    </div>
  );
};

export default RecipePage;