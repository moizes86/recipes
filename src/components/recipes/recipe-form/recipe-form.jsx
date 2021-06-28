import React, { useState } from "react";

import { addRecipe } from "../../../DAL/api";

// Components
import InputCheckbox from "../../form/input-checkbox/input-checkbox";
import RecipeFormItems from "./recipe-form-items/recipe-form-items";

import "./recipe-form.scss";
const RecipeForm = () => {
  const [values, setValues] = useState({
    name: "",
    source: "",
    sourceURL: "",
    file: null,
    description: "",
    dietsSelected: [],
    mealTypesSelected: [],
    ingredients: [],
    instructions: [],
    quantity: undefined,
    unit: undefined,
    note: undefined,
    instruction: undefined
  });

  const [errors, setErrors] = useState({
    ingredients: "",
    instructions: "",
    general: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSelect = ({ target: { name, value, checked } }) => {
    if (checked) {
      setValues({ ...values, [name]: values[name].concat([value]) });
    } else {
      setValues({ ...values, [name]: values[name].filter((item) => item !== value) });
    }
  };

  const addIngredient = (e) => {
    e.preventDefault();
    const { quantity, unit, note } = values; // deconstract values
    if (quantity && unit && note) {
      values.ingredients.push({ quantity, unit, note }); // add item
      setValues({ ...values, quantity: "", unit: "", note: "" }); // set state
      if (errors.ingredients) setErrors({ ...errors, ingredients: null }); // remove errors if any
    } else {
      setErrors({ ...errors, ingredients: "All fields are required" });
    }
  };

  const addInstruction = e => {
    e.preventDefault();
    const {instruction} = values;
    if(instruction){
      values.instructions.push(instruction);
      console.log(values.instructions);
      setValues({...values})
      if(errors.instructions) setErrors({...errors, instrcutions:null})
    } else{
      setErrors({...errors, instructions: "Required"})
    }
  }

  const removeItem = ({ target: { title, id } }) => {
    values[title].splice(id, 1);
    setValues({ ...values });
  };

  const checkErrors = () => {
    if (!values.ingredients.length) {
      setErrors({
        ...errors,
        ingredients: "At least one ingredient is required",
        general: "Please complete all required fields",
      });
      return false;
    }
    if (!values.instrcutions.length) {
      setErrors({
        ...errors,
        instrcutions: "At least one instruction is required",
        general: "Please complete all required fields",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) addRecipe(values);
  };

  return (
    <form className="recipe-form " onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col col-md-6" controlid="recipeName">
          <label htmlFor="recipeName" className="ml-1 form-label ">
            *Recipe Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter recipe name"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group col col-md-6" controlid="recipeSource">
          <label htmlFor="recipeSource" className="ml-1 form-label">
            Source:
          </label>
          <input
            type="text"
            id="source"
            name="source"
            className="form-control"
            placeholder="Enter recipe source"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group flex-grow-1" controlid="recipeSourceURL">
        <label htmlFor="recipeSourceURL" className="ml-1 form-label">
          Link To Source:
        </label>
        <input
          type="text"
          id="sourceURL"
          name="sourceURL"
          className="form-control"
          placeholder="Enter link to original recipe source"
          onChange={handleChange}
        />
      </div>

      <div className="input-file input-group my-4">
        <div className="custom-file">
          <input type="file" />
        </div>
        <button>Upload</button>
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label " htmlFor="description">
          *General description, will be presented below the title
        </label>
        <textarea
          className="form-control "
          id="description"
          name="description"
          rows="3"
          required
          onChange={handleChange}
        ></textarea>
      </div>

      <InputCheckbox
        title="Diet Type:"
        name="dietsSelected"
        items={["Vegan", "Kosher", "Straight", "Gay", "Halal"]}
        itemsSelected={values.dietsSelected}
        handleSelect={handleSelect}
      />

      <div className="my-2"></div>
      <InputCheckbox
        title="Meal Type:"
        name="mealTypesSelected"
        items={["Breakfast", "Lunch", "Dinner"]}
        itemsSelected={values.mealTypesSelected}
        handleSelect={handleSelect}
      />

      {/************* Ingredients *************/}
      <div className="ingredients my-4">
        <p className="">Ingredients:</p>
        <div className=" d-flex font-smaller">
          <div className="form-group mr-2 narrow " controlid="quantity">
            <label className="form-label ">Amount</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              min="1"
              value={values.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mr-2 narrow" controlid="measurement">
            <label className="form-label "> Units</label>
            <select
              className="form-control"
              as="select"
              value={values.unit}
              name="unit"
              onChange={handleChange}
            >
              <option disabled selected value>
                --
              </option>
              <option>g</option>
              <option>cup</option>
              <option>teaspoon</option>
            </select>
          </div>

          <div className="form-group flex-grow-1" controlid="note">
            <label htmlFor="note " className="form-label ">
              Notes:
            </label>
            <input
              type="text"
              id="note"
              name="note"
              className="form-control"
              placeholder="Example: soaked in vinegar"
              onChange={handleChange}
              value={values.note}
            />
          </div>
        </div>

        <RecipeFormItems title="ingredients" items={values.ingredients} removeItem={removeItem} />

        <button className="btn btn-primary mr-3" onClick={addIngredient}>
          Add
        </button>
        <small>{errors.ingredients}</small>
      </div>

      {/************* END Ingredients *************/}

      {/************* Instructions *************/}
      <div className="instructions my-4">
        <label className="form-label font-bolder">Instructions:</label>
        <div className="form-group d-flex" controlid="instruction">
          <input
            type="text"
            className="form-control "
            id="instruction"
            name="instruction"
            placeholder="What should be done next"
            onChange={handleChange}
          />
          </div>
          <RecipeFormItems
            title="instructions"
            items={values.instructions}
            removeItem={removeItem}
          />

          <button className="btn btn-primary ml-3" onClick={addInstruction}>
            Save
          </button>

          <small>{errors.instructions}</small>
      </div>

      <button className="btn btn-primary" type="submit">
        Add Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
