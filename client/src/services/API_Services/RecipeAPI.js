import axios from "axios";
import { httpGet, httpPost, httpPut } from "../CRUD_Service";

const url = "http://localhost:3100/recipes";


// export const getRecipes = async () => {
//   return await httpGet(url);
// };

// export const getRecipe = async (recipeId) => {
//   return await httpGet(`${url}/recipe?recipeId=${recipeId}`);
// };

// export const getMeasuringUnits = async () => {
//   return await httpGet(`${url}/measuring-units`);
// };

// export const getDiets = async () => {
//   return await httpGet(`${url}/diets`);
// };

// export const getCategories = async () => {
//   return await httpGet(`${url}/categories`);
// };

export const getDiffictultyLevels = async () => {
  return await httpGet(`${url}/difficulty-levels`);
};

// export const addRecipe = async (data) => {
//   return await httpPost(`${url}/add-recipe`, data);
// };

// export const editRecipe = async (data) => {
//   return await httpPut(`${url}/edit-recipe`, data);
// };

export const searchRecipe = async (data) => {
  return await httpGet(`${url}/search?q=${data}`);
};

// export const getMyRecipes = async (id) => {
//   return await httpGet(`${url}/my-recipes?userId=${id}`);
// };

export const getImages = async (recipe_id) => {
  return httpGet(`${url}/images?recipe_id=${recipe_id}`);
};

export const uploadImage = async (image) => {
  return httpPost(`${url}/images`, image);
};

// / / / / / / / / / / / / / / / / //
// / / / / / / / / / / / / / / / / //
// FLASK
// / / / / / / / / / / / / / / / / //


// FLASK

const url_flask = "http://localhost:5000/recipes";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": true,
  },
};

export const getRecipe = async (recipeId) => {
  try{
    return await axios.get(`${url_flask}/recipe?recipeId=${recipeId}`, config)
  }catch(e){
    return {data:{message:'Error: could not get recipe', status:400}}
  }
};

export const getRecipes = async () => {
  try {
    return await axios.get(url_flask);
  } catch (e) {
    return { data: { message: "Error: could not get recipes", status: 400 } };
  }
};

export const getDiets = async () => {
  return await axios.get(`${url_flask}/diets`);
};

export const getMeasuringUnits = async () => {
  return await axios.get(`${url_flask}/measuring-units`);
};

export const getCategories = async () => {
  return await axios.get(`${url_flask}/categories`, config);
};

export const addRecipe = async (data) => {
  console.log(data)
  return await axios.post(`${url_flask}/add-recipe`, data, config);
};

export const getMyRecipes = async (id) => {
  return await axios.get(`${url_flask}/my-recipes?userId=${id}`);
};

export const editRecipe = async (data) => {
  return await axios.put(`${url_flask}/edit-recipe`, data, config);
};