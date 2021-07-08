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
const RecipeForm = () => {
  const [values, setValues] = useState({
    userId: 1,
    title: "Chicken",
    source: "walla",
    url: "www.walla.co.il",
    image: null,
    description: "Gin tonic and muabet bet bet bet bet bet bet ",
    dietsSelected: [],
    categoriesSelected: [],
    ingredients: [{ amount: 666, unitId: 1, note: "Take the ball put it the basket pass pass it's a come" }],
    instructions: ["Take the chicken", "Go fuck yourself"],
    difficultyLevel: undefined,
    prepTime: undefined,
    yield: undefined,
  });

  const [errors, setErrors] = useState({
    title: "",
    url: "",
    file: "",
    ingredients: "",
    instructions: "",
  });

  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [diets, setDiets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);

  const getOptionsAsync = async () => {
    const measuringUnitsCall = await getMeasuringUnits();
    const dietsCall = await getDiets();
    const categoriesCall = await getCategories();
    const difficultyLevelsCall = await getDiffictultyLevels();
    setMeasuringUnits([...measuringUnitsCall.data]);
    setDiets([...dietsCall.data]);
    setCategories([...categoriesCall.data]);
    setDifficultyLevels([...difficultyLevelsCall.data]);
  };

  useEffect(() => {
    getOptionsAsync();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheck = ({ target: { name, value, checked } }) => {
    debugger
    if (checked) {
      values[name].push(value);
    } else {
      values[name] = values[name].filter((item) => item !== value);
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
    const errors = {};

    // Title
    if (values.title.length < 3) {
      errors["title"] = "Too short! Minimum 3 letters";
    } else if (values.title.length > 45) {
      errors["title"] = "Too Long! Maximum 45 letters";
    }

    // Url
    const regUrl =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

    if (!regUrl.test(values.url)) errors["url"] = "Invalid Link";

    // Ingredients
    if (values.ingredients.length === 0) errors["ingredients"] = "Come on, at least one ingredient is necessary";

    // Instructions
    if (values.instructions.length === 0) errors["instructions"] = "At least one instruction is necessary";

    // Total
    if (Object.values(errors).some((val) => val !== "")) {
      setErrors({ ...errors, addRecipe: "Please review your details" });
    } else {
      setErrors({});
      return "ok";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validateForm() === "ok") console.table(values);
    validateForm();
    addRecipe({ ...values });
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
          required={true}
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
          required
          onChange={handleChange}
        ></textarea>
      </div>

      <InputCheckbox
        title="Diets:"
        name="dietsSelected"
        items={diets}
        itemsSelected={values.dietsSelected}
        handleCheck={handleCheck}
      />

      <div className="my-2"></div>
      <InputCheckbox
        title="Categories:"
        name="categoriesSelected"
        items={categories}
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
            {difficultyLevels.map((item, i) => (
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
          name="yield"
          type="number"
          value={values.yield}
          required={false}
          shrinkLabel={false}
          classes="font-bolder"
          cols="col-2"
          handleChange={handleChange}
        />
      </div>

      <Ingredients
        measuringUnits={measuringUnits}
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
      {errors.addRecipe && <small>{errors.addRecipe}</small>}
    </form>
  );
};

export default RecipeForm;
