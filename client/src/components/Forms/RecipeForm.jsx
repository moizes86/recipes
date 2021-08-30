import React, { useState, useEffect } from "react";

import {
  getMeasuringUnits,
  getDiets,
  getCategories,
  addRecipe,
  getRecipe,
  editRecipe,
} from "../../services/API_Services/RecipeAPI";

// import { useSelector } from "react-redux";
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

let initialValues = {
  title: "",
  source: "",
  source_url: "",
  images: [],
  description: "",
  dietsSelected: [],
  categoriesSelected: [],
  ingredients: [],
  instructions: [],
  cook: 0,
  servings: 0,
};

let initialOptions = {
  diets: [],
  categories: [],
  measuringUnits: [],
};

let initialErrors = {
  title: "",
  source_url: "",
  file: "",
  ingredients: "",
  instructions: "",
  general: "",
};

// Caching: store data in localStorage instead of fetching the API everytime.
const getOptions = async () => {
  const getOptionsAsync = async () => {
    const options = await Promise.all(
      [await getMeasuringUnits(), await getDiets(), await getCategories()].map((option) => option.data)
    );
    const optionsObject = {
      measuringUnits: options[0],
      diets: options[1],
      categories: options[2],
    };
    localStorage.setItem("options", JSON.stringify(optionsObject));
  };

  if (!localStorage.getItem("options")) await getOptionsAsync();
  return JSON.parse(localStorage.getItem("options"));
};

const RecipeForm = () => {
  const location = useLocation();
  const params = useParams();
  // const { _id:{$oid:user_id} } = useSelector((state) => state.activeUser);
  // const { id } = useSelector((state) => state.activeUser);
  const { sendRequest, loading, data, status, error, Spinner } = useFetch();

  // STATES

  const [values, setValues] = useState(initialValues);
  const [options, setOptions] = useState(initialOptions);
  const [errors, setErrors] = useState(initialErrors);

  const getRecipeAsync = async () => {
    // Sets values to data from server
    const { recipeId } = params;
    let { data } = await getRecipe(recipeId);

    // Add deleted items props, will be used to delete them from db
    data.ingredientsDeleted = [];
    data.instructionsDeleted = [];
    setValues(data);
  };

  useEffect(() => {
    if (location.pathname.includes("/edit-recipe")) {
      getRecipeAsync();
    } else {
      setValues({ /*user_id, */ ...initialValues });
    }

    return()=>setValues({ ...initialValues });
  }, [location]);

  useEffect(() => {
    (async () => {
      const options = await getOptions();
      setOptions({ ...options });
    })();

    return () => {
      setValues({ ...initialValues });
      setErrors({ ...initialErrors });
    };
  }, []);

  // FUNCTIONALITY

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheck = ({ target: { name, checked, id, value } }) => {
    if (checked) {
      values[name].push({ id: +id, title: value });
    } else {
      values[name] = values[name].filter((item) => item.title !== value);
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

  const setImagesInFormState = (images) => {
    setValues({ ...values, images });
  };

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
      setErrors(initialErrors)
      return true;
    } catch (e) {
      setErrors({ [e.field]: e.message });
      scrollToError(e);

      return false;
    }
  };

  const valuesToFormData = () => {
    const formData = new FormData();
    for (const image of values.images) formData.append("images", image);
    for (const key in values) if (key !== "images") formData.append(key, JSON.stringify(values[key]));
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        setErrors(initialErrors);
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
                setImagesInFormState={setImagesInFormState}
                images={values.images}
                errors={errors.images}
              />
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : status === 200 ? (
        <CheckCircleSuccess message="Recipe was added successfully" />
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
