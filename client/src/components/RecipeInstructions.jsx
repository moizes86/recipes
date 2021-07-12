import React from "react";

const RecipeInstructions = ({ instructions }) => {
  return (
    <>
      <h5>Instructions</h5>
      <ul>
        {instructions.map((instruction, i) => (
          <li key={`${instruction.id}-${i}`}>{instruction.text}</li>
        ))}
      </ul>
    </>
  );
};

export default RecipeInstructions;
