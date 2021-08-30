import React, { useEffect } from "react";
import RecipePreview from "./RecipePreview";

import { useSelector, useDispatch } from "react-redux";

const Gallery = () => {
  let { loading, recipes } = useSelector((state) => state);
  useEffect(() => {
    
  }, [recipes])
  return (
    <div className="gallery">
      <h1 className="mb-4 text-center">Recipes</h1>
      <div className="cards-container px-4">
        {loading
          ? "Loading..."
          : recipes?.map((recipe, i) => <RecipePreview key={`${recipe.recipe_name}-${i}`} data={recipe} />)}
      </div>
    </div>
  );
};

export default Gallery;
