import React, { useState } from "react";

import InputField from "./InputField";
import "../../styles/styles.scss";
import RecipeIngredients from "../RecipeIngredients";

const RecipeFormIngredients = ({ measuringUnits, ingredients, addItem, removeItem, submitError }) => {
  const [values, setValues] = useState({
    amount: 1,
    unitId: 1,
    text: "",
  });

  const [error, setError] = useState("");

  const handleIngredient = (e) => {
    e.preventDefault();
    
    const { amount, unitId, text } = values;
    if (amount && text) {
      addItem({ amount, unitId, text, unit: measuringUnits[values.unitId - 1]?.unit }, "ingredients");
      setValues({ amount: 1, unitId: 1, text: "" });
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
      <div className="font-smaller row align-items-center pr-3">
        <InputField
          label="Amount"
          name="amount"
          type="number"
          value={values.amount}
          shrinkLabel={false}
          classes="font-bolder"
          cols="col col-sm-3"
          handleChange={handleChange}
        />

        <div className="form-group mr-2" controlid="measurement">
          <label className="form-label font-bolder"> Units</label>
          <select
            className="form-control "
            value={values.unitId}
            name="unitId"
            onChange={handleChange}
            
          >
            
            {measuringUnits.map((unit, i) => (
              <option key={`${unit}-${i}`} value={unit.id} label={unit.unit}>
                {unit.unit || '--'}
              </option>
            ))}
          </select>
        </div>

        <div className=" flex-grow-1" controlid="text">
          <InputField
            label="Notes"
            type="text"
            name="text"
            placeholder="Example: soaked in vinegar"
            value={values.text}
            cols="col"
            shrinkLabel={false}
            classes="form-label font-bolder"
            handleChange={handleChange}
          />
        </div>
        <i className="fas fa-plus" onClick={handleIngredient}></i>
      </div>

      <RecipeIngredients ingredients={ingredients} removeItem={removeItem} partOfForm={true}/>

      <small>{error || (!ingredients.length && submitError)}</small>
    </div>
  );
};

export default RecipeFormIngredients;
