import React, { useState } from "react";

import InputField from "./InputField";
import RecipeFormItems from "./RecipeFormItems";
import "../../styles/styles.scss";

const RecipeFormInstructions = ({ instructions, addItem, removeItem }) => {
  const [instruction, setInstruction] = useState({
    id:null,
    text:''
  });
  const [error, setError] = useState("");

  const handleChange = ({ target: { id, value } }) => {
    setInstruction({id, text:value});
  };

  const addInstruction = (e) => {
    e.preventDefault();
    if (instruction) {
      addItem(instruction , "instructions");
      setInstruction({id:'', text:''});
      if (error) setError("");
    } else {
      setError("Required");
    }
  };

  return (
    <div className="instructions my-4">
      <InputField
        label="* Instructions"
        // name="instruction"
        type="text"
        placeholder="What should be done next"
        value={instruction.text}
        required={false}
        shrinkLabel={false}
        classes="font-bolder pl-0"
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

export default RecipeFormInstructions;
