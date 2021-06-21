import React from "react";
const Instructions = ({ ingredients, directions }) => {
  return (
    <div className="instructions mt-4">
      <div className="ingredients">
        <h3>Ingredients:</h3>{" "}
        <ul>
          {ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="directions">
        <h3>Directions:</h3>
        <ul>
          {directions.map((directions, i) => (
            <li key={i}>{directions}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
