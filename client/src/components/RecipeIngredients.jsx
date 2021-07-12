import React from "react";

const RecipeIngredients = ({ ingredients }) => {
  return (
    <>
      <h5>Ingredients</h5>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={`${ingredient.text}`}>
            {ingredient.amount} {ingredient.unit} {ingredient.text}
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecipeIngredients;
