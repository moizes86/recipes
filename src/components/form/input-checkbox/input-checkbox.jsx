import React from "react";
import { Field } from "formik";

const InputCheckbox = ({categoriesChecked}) => {
  const categories = ["Vgean", "Kosher", "Breakfast", "Lunch", "Dinner"];
  return (
    <>
      <div id="checkbox-group">Checked</div>
      <div role="group" aria-labelledby="checkbox-group">
        {categories.map((category, i) => (
          <label>
            <input type="checkbox" name="categories" value={category} key={`${category}-${i}`} checked={categoriesChecked.includes(category)}/>
            {category}
          </label>
        ))}
      </div>
    </>
  );
};

export default InputCheckbox;
