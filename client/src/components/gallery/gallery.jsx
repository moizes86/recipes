import React, { useEffect, useState } from "react";
import RecipePreview from "../recipes/recipe-preview/recipe-preview";

import { useSelector, useDispatch } from "react-redux";
import { onLoading, onSetRecipes } from "../../redux/actions";
import { getRecipes } from "../../services/API_Services/RecipeAPI";

const Gallery = () => {
  const dispatch = useDispatch();
  // const [recipes, setRecipes] = useState([]);
  let { loading, recipes } = useSelector((state) => state);

  useEffect(() => {
    dispatch(onLoading(true));
    (async () => {
      const result = await getRecipes();
      dispatch(onSetRecipes(result.data));
    })();
    dispatch(onLoading(false));
  }, [dispatch]);
  return (
    <div className="gallery mt-4">
      <h1 className="mb-4">Dishes Bitches!</h1>
      <div className="flex-wrap justify-content-center row">
        {loading
          ? "Loading..."
          : recipes.map((recipe, i) => <RecipePreview key={`${recipe.recipe_name}-${i}`} data={recipe} />)}
      </div>
    </div>
  );
};

export default Gallery;
