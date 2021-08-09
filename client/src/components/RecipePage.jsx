import React, { useState, useEffect } from "react";

// Components
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";

// STYLES
import "../styles/styles.scss";

import { useParams } from "react-router-dom";
import { getCategories, getDiets, getRecipe } from "../services/API_Services/RecipeAPI";
import useFetch from "../useFetch";

const RecipePage = () => {
  const { id, title } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { sendRequest, loading, data, error, Spinner } = useFetch();
  useEffect(() => {
    sendRequest(getRecipe, id, title);
  }, [id]);

  useEffect(() => {
    setRecipe(data);
  }, [data]);

  return (
    <div className="recipe-page py-5">
      {loading || !data ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            <div className="col-sm-6">
              <img src={`${process.env.REACT_APP_SERVER_PATH_FLASK}/${recipe.image_url}`} alt="" />
              <img
                className="background-img"
                src={`${process.env.REACT_APP_SERVER_PATH_FLASK}/${recipe.image_url}`}
                alt=""
              />
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
