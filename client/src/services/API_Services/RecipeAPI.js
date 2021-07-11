import { httpGet, httpPost, httpPut } from "../CRUD_Service";

const url = "http://localhost:3100/recipes";

export const getRecipes = async () => {
  return await httpGet(url);
};

export const getRecipe = async (id) => {
  return await httpGet(`${url}/recipe?recipeId=${id}`);
};

export const getMeasuringUnits = async () => {
  return await httpGet(`${url}/measuring-units`);
};

export const getDiets = async () => {
  return await httpGet(`${url}/diets`);
};

export const getCategories = async () => {
  return await httpGet(`${url}/categories`);
};

export const getDiffictultyLevels = async () => {
  return await httpGet(`${url}/difficulty-levels`);
};

export const addRecipe = async (data) => {
  return await httpPost(`${url}/add-recipe`, data);
};

export const editRecipe = async (data) => {
  return await httpPut(`${url}/edit-recipe`, data);
};

export const searchRecipe = async (data) => {
  return await httpGet(`${url}/search?q=${data}`);
};
