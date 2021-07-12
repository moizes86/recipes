import React, { useState } from "react";

import InputField from "./InputField";
import RecipeFormItems from "./RecipeFormItems";
import "../../styles/styles.scss";

const RecipeFormIngredients = ({ measuringUnits, ingredients, addItem, removeItem, submitError }) => {
  const [values, setValues] = useState({
    amount: 1,
    unitId: "DEFAULT",
    text: "",
  });

  const [error, setError] = useState("");

  const handleIngredient = (e) => {
    e.preventDefault();
    const { amount, unitId, text } = values;
    if (amount && text) {
      addItem({ amount, unitId, text }, "ingredients");
      setValues({ amount: 1, unitId: "DEFAULT", text: "" });
      if (error) setError("");
    } else {
      setError("All fields are required");
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="recipe-form-ingredients my-4">
      <p className="font-bolder">* Ingredients:</p>
      <div className=" d-flex font-smaller row">
        <InputField
          label="Amount"
          name="amount"
          type="number"
          value={values.amount}
          required={true}
          shrinkLabel={false}
          classes="font-bolder"
          cols="col-3 col-sm-2"
          handleChange={handleChange}
        />

        <div className="form-group mr-2 narrow" controlid="measurement">
          <label className="form-label font-bolder"> Units</label>
          <select
            className="form-control"
            value={values.unitId}
            defaultValue="DEFAULT"
            name="unitId"
            onChange={handleChange}
            required
          >
            <option disabled value="DEFAULT">
              --
            </option>
            {measuringUnits.map((unit, i) => (
              <option key={`${unit}-${i}`} value={unit.id} label={unit.unit}>
                {unit.unit}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group flex-grow-1" controlid="text">
          <InputField
            label="Notes"
            type="text"
            name="text"
            placeholder="Example: soaked in vinegar"
            value={values.text}
            cols='col'
            required={false}
            shrinkLabel={false}
            classes="form-label font-bolder"
            handleChange={handleChange}
          />
        </div>
      </div>

      <RecipeFormItems
        title="ingredients"
        items={ingredients}
        measuringUnits={measuringUnits}
        removeItem={removeItem}
      />

      <button className="btn btn-primary mr-3" onClick={handleIngredient}>
        Add
      </button>
      <small>{error || submitError}</small>
    </div>
  );
};

export default RecipeFormIngredients;
