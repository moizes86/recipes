import { httpGet, httpPost, httpPut } from "../CRUD_Service";
import { CustomError } from "../../DAL/validations";

const url = "http://localhost:3100/users";

// signup
export const createUser = async (data) => {
  try {
    const response = await httpPost(`${url}/signup`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// login after signup
export const getUserById = async (id) => {
  try {
    return await httpGet(`${url}/login?${id}`);
  } catch (error) {
    return error;
  }
};

export const loginUser = async (loginData) => {
  // try {
    return await httpPost(`${url}/login`, loginData);
  // } catch (e) {
    // debugger
    // if (e.request.status === 401) {
      // throw new CustomError('sign');
    // }
  // }
};

export const logoutUser = async () => {
  return httpPost(`${url}/logout`);
};

export const checkUserLoggedIn = async () => {
  return httpGet(`${url}/login`);
};

export const updateUserDetails = async (details) => {
  return httpPut(`${url}/update-details`, details);
};
