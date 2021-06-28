import React from "react";
import RecipePreview from "../recipes/recipe-preview/recipe-preview";
import dishesArr from "../../dishesArr";


const Gallery = ({ dishes = [] }) => {
  return (
      <div className="gallery mt-4">
      <h1 className="mb-4">Dishes Bitches!</h1>
    <div className="flex-wrap justify-content-center row">
      {dishesArr.map((dish, i) => (
        <RecipePreview key={`${dish.recipe.label}-${i}`} data={dish} />
      ))}
    </div>
    </div>
  );
};

export default Gallery;
