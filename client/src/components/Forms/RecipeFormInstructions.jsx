import React, { useState } from "react";

import InputField from "./InputField";
import RecipeInstructions from "../RecipeInstructions";
import "../../styles/styles.scss";

const RecipeFormInstructions = ({ instructions, addItem, removeItem, submitError }) => {
  const [instruction, setInstruction] = useState({
    id: null,
    text: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ target: { id, value } }) => {
    setInstruction({ id, text: value });
  };

  const addInstruction = (e) => {
    e.preventDefault();
    if (instruction.text.length) {
      addItem(instruction, "instructions");
      setInstruction({ id: "", text: "" });
      if (error) setError("");
    } else {
      setError("Required");
    }
  };

  return (
    <div className="recipe-form-instructions my-4">
      <div className="row align-items-center">
        <div className="flex-grow-1 col">
          <InputField
            label="* Instructions"
            type="text"
            placeholder="What should be done next"
            value={instruction.text ?? instruction}
            required={false}
            shrinkLabel={false}
            classes="font-bolder pl-0 "
            handleChange={handleChange}
          />
        </div>
        <i className="pr-3 fas fa-plus" onClick={addInstruction}></i>
      </div>

      <RecipeInstructions instructions={instructions} removeItem={removeItem} partOfForm={true}/>

      <small>{error || (!instructions.length && submitError)}</small>
    </div>
  );
};

export default RecipeFormInstructions;
