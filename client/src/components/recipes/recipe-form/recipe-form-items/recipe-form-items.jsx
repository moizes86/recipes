import React from "react";

import "./recipe-form-items.scss";

const RecipeFormItems = ({ title, items = [], removeItem, measuringUnits }) => {
  return (
    <ul className="recipe-form-items">
      {items.map((item, i) => (
        <li key={`${item.id}-${i}`}>
          <span id={item.id} title={title} index={i} className="remove-item" onClick={removeItem}>
            X
          </span>
          {item.instruction ? (
            <span index={i}>{item.instruction}</span>
          ) : (
            <span id={item.id}>
              {item.amount} {measuringUnits[+item.unitId - 1]?.unit} {item.note}{" "}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RecipeFormItems;
