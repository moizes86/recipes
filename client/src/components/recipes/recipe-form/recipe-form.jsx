import React, { useState, useEffect } from "react";

import {
  getMeasuringUnits,
  getDiets,
  getCategories,
  getDiffictultyLevels,
  addRecipe,
} from "../../../services/API_Services/RecipeAPI";

// Components
import InputCheckbox from "../../form/input-checkbox/input-checkbox";
import InputField from "../../form/input-field/input-field";
import Ingredients from "./ingredients/ingredients";
import Instructions from "./instructions/instructions";
import ImageUpload from "./image-upload/image-upload";

import "./recipe-form.scss";

const { validationsAPI } = require("../../../DAL/validations");

const RecipeForm = () => {
  const [values, setValues] = useState({
    userId: 1,
    title: "",
    source: "",
    url: "",
    image: null,
    description: "",
    dietsSelected: [],
    categoriesSelected: [],
    ingredients: [],
    instructions: [],
    difficultyLevel: undefined,
    prepTime: undefined,
    _yield: undefined,
  });

  const [errors, setErrors] = useState({
    title: "",
    url: "",
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

  useEffect(() => {
    getOptionsAsync();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheck = ({ target: { name, checked,id } }) => {
    debugger
    if (checked) {
      values[name].push(id);
    } else {
      values[name] = values[name].filter((item) => item !== id);
    }
    setValues({ ...values });
  };

  const addItem = (item, valueName) => {
    values[valueName].push(item);
    setValues({ ...values });
  };

  const removeItem = ({ target: { title, id } }) => {
    values[title].splice(id, 1);
    setValues({ ...values });
  };

  const addImage = (image) => setValues({ ...values, image });
  const removeImage = () => setValues({ ...values, image: "" });

  const validateForm = () => {
    const {
      userId,
      title,
      url,
      image,
      description,
      ingredients,
      instructions,
      difficultyLevel,
      _yield,
    } = values;
    try {
      validationsAPI.required("UserId", userId);
      validationsAPI.recipeTitle(title);
      validationsAPI.required("Description", description);
      validationsAPI.ingredients(ingredients);
      validationsAPI.instructions(instructions);
      validationsAPI.yield(_yield);
      validationsAPI.difficultyLevel(difficultyLevel);
      if (url) validationsAPI.url(url);
      if (image) validationsAPI.image(image);

      return true;
    } catch (e) {
      setErrors({ ...errors, general: e.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) addRecipe({ ...values });
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
        name="url"
        type="text"
        placeholder="Enter a valid link"
        value={values.url}
        errors={errors.url}
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
            value={values.difficultyLevel}
            defaultValue="DEFAULT"
            name="difficultyLevel"
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
          name="prepTime"
          type="number"
          value={values.prepTime}
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
        Add Recipe
      </button>
      <br />
      {errors.general && <small>{errors.general}</small>}
    </form>
  );
};

export default RecipeForm;
