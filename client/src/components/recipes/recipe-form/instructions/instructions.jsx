import React, { useState } from "react";

import InputField from "../../../form/input-field/input-field";
import RecipeFormItems from "../recipe-form-items/recipe-form-items";

const Instructions = ({ instructions, addItem, removeItem }) => {
  const [instruction, setInstruction] = useState("");
  const [error, setError] = useState('')

  const handleChange = ({ target: { value } }) => {
    setInstruction(value);
  };

  const addInstruction = e =>{
    e.preventDefault();
    if (instruction){
      addItem(instruction, 'instructions')
      setInstruction('')
      if(error) setError('')
    }else{
      setError('Required')
    }
  }

  return (
    <div className="instructions my-4">
      <InputField
        label="* Instructions"
        name="instruction"
        type="text"
        placeholder="What should be done next"
        value={instruction}
        required={false}
        shrinkLabel={false}
        classes="font-bolder pl-0"
        cols="col-12"
        handleChange={handleChange}
      />

      <RecipeFormItems title="instructions" items={instructions} removeItem={removeItem} />

      <button className="btn btn-primary mr-4" onClick={addInstruction}>
        Add
      </button>

      <small>{error}</small>
    </div>
  );
};

export default Instructions;
