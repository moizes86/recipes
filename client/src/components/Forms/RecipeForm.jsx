import React, { useState, useEffect } from "react";

import {
  getMeasuringUnits,
  getDiets,
  getCategories,
  addRecipe,
  getRecipe,
  editRecipe,
} from "../../services/API_Services/RecipeAPI";

import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import useFetch from "../../useFetch";

// Components
import InputCheckbox from "./InputCheckbox";
import InputField from "./InputField";
import Ingredients from "./RecipeFormIngredients";
import Instructions from "./RecipeFormInstructions";
import ImageUpload from "./ImageUpload";
import CheckCircleSuccess from "../CheckCircleSuccess";
import CustomButton from "../CustomButton";

import "../../styles/styles.scss";

const { validationsAPI } = require("../../DAL/validations");

const initialValues = {
  title: "",
  source: "",
  source_url: "",
  image_url: null,
  description: "",
  dietsSelected: [],
  categoriesSelected: [],
  ingredients: [],
  instructions: [],
  cook: 0,
  servings: 0,
};

const RecipeForm = () => {
  const location = useLocation();
  const params = useParams();
  const { _id:{$oid:user_id} } = useSelector((state) => state.activeUser);
  const { sendRequest, loading, data, error, Spinner } = useFetch();

  // STATES
  const [values, setValues] = useState({
    title: "",
    source: "",
    source_url: "",
    image_url: null,
    description: "",
    dietsSelected: [],
    categoriesSelected: [],
    ingredients: [],
    instructions: [],
    cook: 0,
    servings: 0,
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

  // INITIAL SETTINGS
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
    // Sets values to data from server
    const { recipeId } = params;
    let { data } = await getRecipe(recipeId);

    // data.dietsSelected = data.dietsSelected.map((diet) => diet.id??diet.diet_id);
    // data.categoriesSelected = data.categoriesSelected.map((category) => category.id??category.category_id);
    // data.ingredients = JSON.parse(data.ingredients)
    // data.instructions = JSON.parse(data.instructions)

    // Add deleted items props, will be used to delete them from db
    // data.ingredientsDeleted = [];
    // data.instructionsDeleted = [];
    setValues(data);
  };

  useEffect(() => {
    getOptionsAsync();
    if (location.pathname.includes("/edit-recipe")) {
      return getRecipeAsync();
    } else {
      return setValues({ user_id, ...initialValues });
    }
  }, [location]);

  // FUNCTIONALITY

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheck = ({ target: { name, checked, id,value } }) => {
    if (checked) {
      values[name].push({id:+id, title:value});
    } else {
      values[name] = values[name].filter((item) => item.id !== +id);
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

  const removeImage = () => setValues({ ...values, image_url: null });

  const scrollToError = (e) => {
    // Toggle class  'show' where error has occured to enable scrolling
    let targetEl = document.querySelector(`.accordion #${e.field}`);
    while (!Array.from(targetEl.classList).includes("collapse")) {
      targetEl = targetEl.parentElement;
    }
    if (!Array.from(targetEl.classList).includes("show")) targetEl.classList.toggle("show");
    document.querySelector(`#${e.field}`).scrollIntoView({ behavior: "smooth", block: "center" }); // scroll to element
  };
  // SUBMITTING

  const validateForm = () => {
    const { title, source_url, description, ingredients, instructions } = values;
    try {
      validationsAPI.recipeTitle(title);
      validationsAPI.description(description);
      validationsAPI.ingredients(ingredients);
      validationsAPI.instructions(instructions);
      if (source_url) validationsAPI.url(source_url);
      return true;
    } catch (e) {
      setErrors({ [e.field]: e.message });
      scrollToError(e);

      return false;
    }
  };

  const valuesToFormData = () => {
    const formData = new FormData();
    for (const value in values) {
      if (values[value] instanceof Object && value !== "image_url") {
        formData.append(value, JSON.stringify(values[value]));
      } else {
        formData.append(value, values[value]);
      }
    }
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const formData = valuesToFormData();

        if (location.pathname === "/add-recipe") {
          await sendRequest(addRecipe, formData);
        } else {
          await sendRequest(editRecipe, formData);
        }
      }
    } catch (e) {
      setErrors({ ...errors, genereal: e.message });
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

          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne">
            <div className="card-body">
              <div className="form-row">
                <InputField
                  label="* Recipe name (title)"
                  name="title"
                  type="text"
                  placeholder="Enter recipe name"
                  value={values.title}
                  errors={errors.title}
                  shrinkLabel={false}
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
                  onChange={handleChange}
                ></textarea>
                <small>{errors.description}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header " id="headingTwo">
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
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo">
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

              <div className="form-row  mt-3">
                <InputField
                  label="Cook"
                  name="cook"
                  type="number"
                  value={values.cook}
                  errors={errors.cook}
                  shrinkLabel={false}
                  classes="font-bolder"
                  cols="col col-md-3 mr-4"
                  handleChange={handleChange}
                />

                <InputField
                  label="Servings"
                  name="servings"
                  type="number"
                  value={values.servings}
                  errors={errors.servings}
                  max={10}
                  required={false}
                  shrinkLabel={false}
                  classes="font-bolder"
                  cols="col col-md-3"
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
                data-target="#ingredients"
                aria-expanded="true"
                aria-controls="ingredients"
              >
                Ingredients
              </button>
            </h2>
          </div>
          <div id="ingredients" className="collapse" aria-labelledby="headingThree">
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
                data-target="#instructions"
                aria-expanded="false"
                aria-controls="instructions"
              >
                Instructions
              </button>
            </h2>
          </div>
          <div id="instructions" className="collapse" aria-labelledby="instructions">
            <div className="card-body">
              <Instructions
                instructions={values.instructions}
                addItem={addItem}
                removeItem={removeItem}
                submitError={errors.instructions}
              />
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
          <div id="collapseFive" className="collapse" aria-labelledby="headingFive">
            <div className="card-body">
              <ImageUpload
                addImage={addImage}
                removeImage={removeImage}
                image_url={values.image_url}
                errors={errors.image_url}
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : data ? (
        <CheckCircleSuccess message="updated successfully" />
      ) : (
        <CustomButton type="submit">
          {location.pathname === "/add-recipe" ? "Add Recipe" : "Save"}
        </CustomButton>
      )}
      {errors.general && <small>{errors.general}</small>}
    </form>
  );
};

export default RecipeForm;
