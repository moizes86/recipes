import { httpGet, httpPost } from "../CRUD_Service";

const url = "http://localhost:3100/recipes";

export const getRecipes = async () => {
  return await httpGet(url);
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

export const addRecipe = async (data) =>{
  return await httpPost(`${url}/add-recipe`, data)
}
