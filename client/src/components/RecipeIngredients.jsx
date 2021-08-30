import React from "react";

const RecipeIngredients = ({ ingredients, removeItem, partOfForm = false }) => {
  return (
    <div className="recipe-ingredients">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Unit</th>
            <th scope="col">Ingredient</th>

          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, i) => (
            <tr key={`${ingredient.text}-${i}`}>
              <td className="col-1">{ingredient.amount}</td>
              <td className="col-1">{ingredient.unit}</td>
              <td>{ingredient.text}</td>
              {partOfForm && (
                <td className="remove-item text-right pl-2" onClick={removeItem}>
                  <i className="far fa-trash-alt" id={ingredient.id} title="ingredients" index={i}></i>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeIngredients;
