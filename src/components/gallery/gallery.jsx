import React from "react";
import RecipePreview from "../recipes/recipe-preview/recipe-preview";
import dishesArr from "../../dishesArr";

// Styles
import Row from 'react-bootstrap/Row';

const Gallery = ({ dishes = [] }) => {
  return (
      <div className="gallery mt-4">
      <h1 className="mb-4">Dishes Bitches!</h1>
    <Row className="flex-wrap justify-content-center">
      {dishesArr.map((dish, i) => (
        <RecipePreview key={`${dish.recipe.label}-${i}`} data={dish} />
      ))}
    </Row>
    </div>
  );
};

export default Gallery;
