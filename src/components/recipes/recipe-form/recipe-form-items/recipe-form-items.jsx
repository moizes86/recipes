import React from "react";

import "./recipe-form-items.scss";

const RecipeFormItems = ({ title, items = [], removeItem }) => (
  <ul className="recipe-form-items">
    {items.map((item, i) => (
      <li key={`${item.note}-${i}`}>
        <span id={i} title={title} className="remove-item" onClick={removeItem}>
          X
        </span>

        {Object.values(item).map((field, i) => (
          <span key={`${item}-${i}`}>{field}</span>
        ))}
      </li>
    ))}
  </ul>
);

export default RecipeFormItems;
