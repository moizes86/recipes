import React from "react";

const RecipeInstructions = ({ instructions, removeItem, partOfForm = false }) => {
  return (
    <>
      <ol>
        {instructions.map((instruction, i) => (
          <div key={`${instruction.id}-${i}`} className="d-flex align-items-baseline justify-content-between">
            <li className="py-2 px-2">{instruction.text ?? instruction}</li>

            {partOfForm && (
              <i
                className="far fa-trash-alt"
                onClick={removeItem}
                id={instruction.id}
                title={"instructions"}
                index={i}
              ></i>
            )}
          </div>
        ))}
      </ol>
    </>
  );
};

export default RecipeInstructions;
