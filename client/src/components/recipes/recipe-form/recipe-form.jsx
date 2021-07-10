import React, { useState, useEffect } from "react";

import {
  getMeasuringUnits,
  getDiets,
  getCategories,
  getDiffictultyLevels,
  addRecipe,
  getRecipe,
  editRecipe,
} from "../../../services/API_Services/RecipeAPI";

import { useLocation } from "react-router-dom";

// Components
import InputCheckbox from "../../form/input-checkbox/input-checkbox";
import InputField from "../../form/input-field/input-field";
import Ingredients from "./ingredients/ingredients";
import Instructions from "./instructions/instructions";
import ImageUpload from "./image-upload/image-upload";

import "./recipe-form.scss";

const { validationsAPI } = require("../../../DAL/validations");

const RecipeForm = () => {
  const location = useLocation();

  const [values, setValues] = useState({
    user_id: 1,
    title: "",
    source: "",
    source_url: "",
    image: null,
    description: "",
    dietsSelected: [],
    categoriesSelected: [],
    ingredients: [],
    instructions: [],
    difficulty: undefined,
    prep_time: undefined,
    _yield: undefined,
  });

  const [errors, setErrors] = useState({
    title: "",
    source_url: "",
    file: "",
    ingredients: "",
    instructions: "",
    general: "",
  });

  const [options, setOptions] = useState({
    measuringUnits: [],
    diets: [],
    categories: [],
    difficultyLevels: [],
  });

  const getOptionsAsync = async () => {
    const options = await Promise.all(
      [await getMeasuringUnits(), await getDiets(), await getCategories(), await getDiffictultyLevels()].map(
        (option) => option.data
      )
    );

    setOptions({
      measuringUnits: options[0],
      diets: options[1],
      categories: options[2],
      difficultyLevels: options[3],
    });
  };

  const getRecipeAsync = async () => {
    const { data } = await getRecipe(89);

    // Change yield from to _yield because its a reserved word
    Object.defineProperty(data, "_yield", Object.getOwnPropertyDescriptor(data, "yield"));
    delete data.yield;

    // Add deleted items props, will be used to delete them from db
    data.ingredientsDeleted = [];
    data.instructionsDeleted = [];

    setValues(data);
  };
  useEffect(() => {
    getOptionsAsync();

    if (location.pathname === "/edit-recipe") {
      getRecipeAsync();
    }
  }, [location]);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheck = ({ target: { name, checked, id } }) => {
    if (checked) {
      values[name].push(+id);
    } else {
      values[name] = values[name].filter((item) => item !== +id);
    }
    setValues({ ...values });
  };

  const addItem = (item, valueName) => {
    values[valueName].push(item);
    setValues({ ...values });
  };

  const removeItem = ({
    target: {
      title,
      id,
      attributes: {
        index: { value: index },
      },
    },
  }) => {
    values[title].splice(index, 1);

    // On update, deleted item id will be used in db
    if (id) {
      const propName = title + "Deleted";
      values[propName].push(+id);
    }

    setValues({ ...values });
  };

  const addImage = (image) => setValues({ ...values, image });
  const removeImage = () => setValues({ ...values, image: "" });

  const validateForm = () => {
    const { user_id, title, source_url, image, description, ingredients, instructions, difficulty, _yield } = values;
    try {
      validationsAPI.required("UserId", user_id);
      validationsAPI.recipeTitle(title);
      validationsAPI.required("Description", description);
      validationsAPI.ingredients(ingredients);
      validationsAPI.instructions(instructions);
      validationsAPI.yield(_yield);
      validationsAPI.difficultyLevel(difficulty);
      if (source_url) validationsAPI.url(source_url);
      if (image) validationsAPI.image(image);

      return true;
    } catch (e) {
      setErrors({ ...errors, general: e.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (location.pathname === "/add-recipe") {
        addRecipe({ ...values });
      } else {
        editRecipe({ ...values });
      }
    }
  };
  return (
    <form className="recipe-form " onSubmit={handleSubmit}>
      <ImageUpload addImage={addImage} removeImage={removeImage} image={values.image} />
      {/* ########### ROW ########### */}
      <div className="form-row">
        <InputField
          label="* Recipe name (title)"
          name="title"
          type="text"
          placeholder="Enter recipe name"
          value={values.title}
          // required={true}
          shrinkLabel={false}
          errors={errors.title}
          classes="font-bolder pl-0"
          cols="col col-md-6"
          handleChange={handleChange}
        />

        <InputField
          label="Source"
          name="source"
          type="text"
          placeholder="Where is this from?"
          value={values.source}
          required={false}
          shrinkLabel={false}
          classes="font-bolder  pl-0"
          cols="col-12 col-md-6"
          handleChange={handleChange}
        />
      </div>
      {/* ########### END ROW ########### */}

      {/* ########### ROW ########### */}
      <InputField
        label="Link To Source"
        name="source_url"
        type="text"
        placeholder="Enter a valid link"
        value={values.source_url}
        errors={errors.source_url}
        required={false}
        shrinkLabel={false}
        classes="font-bolder col col-md-6 pl-0"
        handleChange={handleChange}
      />

      {/* ########### END ROW ########### */}

      {/* Description */}
      <div className="form-group">
        <label className="form-label font-bolder" htmlFor="description">
          * General description, will be presented below the title
        </label>
        <textarea
          className="form-control "
          id="description"
          name="description"
          value={values.description}
          rows="3"
          // required
          onChange={handleChange}
        ></textarea>
      </div>

      <InputCheckbox
        title="Diets:"
        name="dietsSelected"
        items={options.diets}
        itemsSelected={values.dietsSelected}
        handleCheck={handleCheck}
      />

      <div className="my-2"></div>
      <InputCheckbox
        title="Categories:"
        name="categoriesSelected"
        items={options.categories}
        itemsSelected={values.categoriesSelected}
        handleCheck={handleCheck}
      />

      <div className="form-row mt-3">
        {/* //////////// Difficulty Levels /////////////*/}
        <div className="form-group mr-2 col-4">
          <label className="form-label font-bolder"> Difficulty Level</label>
          <select
            className="form-control"
            value={values.difficulty}
            defaultValue="DEFAULT"
            name="difficulty"
            onChange={handleChange}
            required
          >
            <option disabled value="DEFAULT">
              --
            </option>
            {options.difficultyLevels.map((item, i) => (
              <option key={`${item}-${i}`} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* ////////// END Difficulty Levels ////////////// */}

        <InputField
          label="Prep Time"
          name="prep_time"
          type="number"
          value={values.prep_time}
          required={false}
          shrinkLabel={false}
          classes="font-bolder"
          cols="col-2"
          handleChange={handleChange}
        />
        <InputField
          label="Yield"
          name="_yield"
          type="number"
          value={values._yield}
          max={10}
          required={false}
          shrinkLabel={false}
          classes="font-bolder"
          cols="col-2"
          handleChange={handleChange}
        />
      </div>

      <Ingredients
        measuringUnits={options.measuringUnits}
        ingredients={values.ingredients}
        submitError={errors.ingredients}
        addItem={addItem}
        removeItem={removeItem}
      />

      <Instructions instructions={values.instructions} addItem={addItem} removeItem={removeItem} />

      <button className="btn btn-primary mt-3" type="submit">
        {location.pathname === "/add-recipe" ? "Add" : "Edit"} Recipe
      </button>
      <br />
      {errors.general && <small>{errors.general}</small>}
    </form>
  );
};

export default RecipeForm;
