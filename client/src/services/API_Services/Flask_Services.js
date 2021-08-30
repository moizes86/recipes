import axios from "axios";

const url_flask_users = "http://localhost:5000/users";
const url_flask_recipes = "http://localhost:5000/recipes";


const config = {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": true,
  },
};

export const isCookie = async () => {
  return axios.get(`${url_flask_users}/login-with-cookie`, config);
};

export const loginUser = async (loginData) => {
  return await axios.post(`${url_flask_users}/login`, loginData, config);
};

export const createUser = async (data) => {
  return await axios.post(`${url_flask_users}/signup`, data, config);
};

// export const logoutUser = async () => {
//   return axios.post(`${url_flask_users}/logout`, config);
// };

// export const updateUserDetails = async (details) => {
//   return httpPut(`${url_flask_users}/update-details`, details, config);
// };
