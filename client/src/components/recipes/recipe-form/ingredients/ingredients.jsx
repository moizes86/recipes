import React, { useState } from "react";

import InputField from "../../../form/input-field/input-field";
import RecipeFormItems from "../recipe-form-items/recipe-form-items";

const Ingredients = ({ measuringUnits, ingredients, addItem, removeItem, submitError }) => {
  const [values, setValues] = useState({
    amount: 1,
    measureUnit: "DEFAULT",
    note: "",
  });

  const [error, setError] = useState("");

  const handleIngredient = (e) => {
    e.preventDefault();
    const { amount, measureUnit, note } = values;
    if (amount && measureUnit && measureUnit !== "DEFAULT" && note) {
      addItem({ amount, measureUnit, note }, "ingredients");
      setValues({ amount: 1, measureUnit: "DEFAULT", note: "" });
      if (error) setError("");
    } else {
      setError("All fields are required");
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="ingredients my-4">
      <p className="font-bolder">* Ingredients:</p>
      <div className=" d-flex font-smaller">
        <InputField
          label="Amount"
          name="amount"
          type="number"
          value={values.amount}
          required={true}
          shrinkLabel={false}
          classes="font-bolder"
          cols="col-2"
          handleChange={handleChange}
        />

        <div className="form-group mr-2 narrow" controlid="measurement">
          <label className="form-label font-bolder"> Units</label>
          <select
            className="form-control"
            value={values.measureUnit}
            defaultValue="DEFAULT"
            name="measureUnit"
            onChange={handleChange}
            required
          >
            <option disabled value="DEFAULT">
              --
            </option>
            {measuringUnits.map((unit, i) => (
              <option key={`${unit}-${i}`} id={unit.id} value={unit.id}>
                {unit.unit}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group flex-grow-1" controlid="note">
          <InputField
            label="Notes"
            type="text"
            name="note"
            placeholder="Example: soaked in vinegar"
            value={values.note}
            required={false}
            shrinkLabel={false}
            classes="form-label font-bolder"
            handleChange={handleChange}
          />
        </div>
      </div>

      <RecipeFormItems title="ingredients" items={ingredients} removeItem={removeItem} />

      <button className="btn btn-primary mr-3" onClick={handleIngredient}>
        Add
      </button>
      <small>{error || submitError}</small>
    </div>
  );
};

export default Ingredients;
