import { httpGet, httpPost } from "../CRUD_Service";

const url = "http://localhost:3100/recipes";

export const getRecipes = async () => {
  return await httpGet(url);
};

export const getMeasuringUnits = async () => {
  return await httpGet(`${url}/measuring-units`);
};

export const getDietTypes = async () => {
  return await httpGet(`${url}/diet-types`);
};

export const getMealTypes = async () => {
  return await httpGet(`${url}/meal-types`);
};

export const getDiffictultyLevels = async () => {
    return await httpGet(`${url}/difficulty-levels`);
};

export const addRecipe = async (data) =>{
  return await httpPost(`${url}/add-recipe`, data)
}
