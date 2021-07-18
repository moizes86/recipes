import React, { useState, useEffect } from "react";

import {
  getMeasuringUnits,
  getDiets,
  getCategories,
  addRecipe,
  getRecipe,
  editRecipe,
  uploadImage,
} from "../../services/API_Services/RecipeAPI";

import { useParams, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

// Components
import InputCheckbox from "./InputCheckbox";
import InputField from "./InputField";
import Ingredients from "./RecipeFormIngredients";
import Instructions from "./RecipeFormInstructions";
import ImageUpload from "./ImageUpload";

import "../../styles/styles.scss";
import CustomButton from "../CustomButton";

const { validationsAPI } = require("../../DAL/validations");

const RecipeForm = () => {
  const location = useLocation();
  const params = useParams();
  const { id: user_id } = useSelector((state) => state.activeUser);

  const [values, setValues] = useState({
    user_id,
    title: "",
    source: "",
    source_url: "",
    image_url: null,
    description: "",
    dietsSelected: [],
    categoriesSelected: [],
    ingredients: [],
    instructions: [],
    cook: "",
    servings: "",
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
  });

  const getOptionsAsync = async () => {
    const options = await Promise.all(
      [await getMeasuringUnits(), await getDiets(), await getCategories()].map((option) => option.data)
    );

    setOptions({
      measuringUnits: options[0],
      diets: options[1],
      categories: options[2],
    });
  };

  const getRecipeAsync = async () => {
    const { recipeId } = params;
    let { data } = await getRecipe(recipeId);

    data.dietsSelected = data.dietsSelected.map((diet) => diet.id);
    data.categoriesSelected = data.categoriesSelected.map((category) => category.id);

    // Add deleted items props, will be used to delete them from db
    data.ingredientsDeleted = [];
    data.instructionsDeleted = [];

    setValues(data);
  };
  useEffect(() => {
    getOptionsAsync();

    if (location.pathname.includes("/edit-recipe")) {
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
        index: { value },
      },
    },
  }) => {
    values[title].splice(value, 1);

    // On update, deleted item id will be used in db
    if (id) {
      const propName = title + "Deleted";
      values[propName].push(+id);
    }

    setValues({ ...values });
  };

  const addImage = (image_url) => {
    setValues({ ...values, image_url });
  };
  const removeImage = () => setValues({ ...values, image_url: "" });

  const validateForm = () => {
    const { user_id, title, source_url, description, ingredients, instructions, servings } = values;
    try {
      validationsAPI.required("UserId", user_id);
      validationsAPI.recipeTitle(title);
      validationsAPI.required("Description", description);
      validationsAPI.ingredients(ingredients);
      validationsAPI.instructions(instructions);
      validationsAPI.servings(servings);
      if (source_url) validationsAPI.url(source_url);

      return true;
    } catch (e) {
      setErrors({ ...errors, general: e.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const value in values) {
      if (values[value] instanceof (Object) && value !== 'image_url') {
        formData.append(value, JSON.stringify(values[value]));
      } else {
        formData.append(value, values[value]);
      }
    }

    if (validateForm()) {
      if (location.pathname === "/add-recipe") {
        await addRecipe(formData);
      } else {
        editRecipe(formData);
      }
    }
  };
  return (
    <form className="recipe-form " onSubmit={handleSubmit}>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                General Details
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <div className="form-row">
                <InputField
                  label="* Recipe name (title)"
                  name="title"
                  type="text"
                  placeholder="Enter recipe name"
                  value={values.title}
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
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                Options
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card-body">
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
                <InputField
                  label="Cook"
                  name="cook"
                  type="number"
                  value={values.cook}
                  required={false}
                  shrinkLabel={false}
                  classes="font-bolder"
                  cols="col col-sm-2"
                  handleChange={handleChange}
                />
                <InputField
                  label="Servings"
                  name="servings"
                  type="number"
                  value={values.servings}
                  max={10}
                  required={false}
                  shrinkLabel={false}
                  classes="font-bolder"
                  cols="col-sm-2 col"
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingThree">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Ingredients
              </button>
            </h2>
          </div>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <Ingredients
                measuringUnits={options.measuringUnits}
                ingredients={values.ingredients}
                submitError={errors.ingredients}
                addItem={addItem}
                removeItem={removeItem}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingFour">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Instructions
              </button>
            </h2>
          </div>
          <div
            id="collapseFour"
            className="collapse"
            aria-labelledby="headingFour"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <Instructions instructions={values.instructions} addItem={addItem} removeItem={removeItem} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingFive">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Add Image
              </button>
            </h2>
          </div>
          <div
            id="collapseFive"
            className="collapse"
            aria-labelledby="headingFive"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <ImageUpload addImage={addImage} removeImage={removeImage} image_url={values.image_url} />
            </div>
          </div>
        </div>
      </div>

        <CustomButton type="submit">
        {location.pathname === "/add-recipe" ? "Add" : "Edit"} Recipe

        </CustomButton>
      <br />
      {errors.general && <small>{errors.general}</small>}
    </form>
  );
};

export default RecipeForm;
