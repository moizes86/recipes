import React from "react";

import "../../styles/styles.scss";

const RecipeFormItems = ({ title, items = [], removeItem, measuringUnits = [] }) => {
  
  return (
    <ul className="recipe-form-items">
      {items.map((item, i) => (
        <li key={`${item.text}-${i}`}>
          <span id={item.id}>
            {/*item.text in both ingredients and instructions */}
            {item.amount} {measuringUnits[item.id - 1]?.unit} {item.text}
          </span>

          <span id={item.id} title={title} index={i} className="remove-item" onClick={removeItem}>
            X
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RecipeFormItems;
