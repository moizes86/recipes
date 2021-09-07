import { httpGet, httpPost, httpPut } from "../CRUD_Service";


// / / / / / / / / / / / / / / / / //
// NODE
// / / / / / / / / / / / / / / / / //

const url = "https://recipes-db-mm.herokuapp.com/users";


// login after signup
export const getUserById = async (id) => {
  try {
    return await httpGet(`${url}/login?${id}`);
  } catch (error) {
    return error;
  }
};

export const updateUserDetails = async (details) => {
  return httpPut(`${url}/update-details`, details);
};

export const isCookie = async () => {
  return httpGet(`${url}/login`);
};

export const logoutUser = async () => {
  return httpPost(`${url}/logout`);
};

export const loginUser = async (loginData) => {
  return await httpPost(`${url}/login`, loginData);
};

export const createUser = async (data) => {
  try {
    const response = await httpPost(`${url}/signup`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};



// / / / / / / / / / / / / / / / / //
// / / / / / / / / / / / / / / / / //
// FLASK
// / / / / / / / / / / / / / / / / //

// const url_flask_users = "http://localhost:5000/users";

// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     "Access-Control-Allow-Credentials": true,
//   },
//   withCredentials: true,
// };


// export const isCookie = async () => {
//   return axios.get(`${url_flask_users}/login-with-cookie`, config);
// };

// export const loginUser = async (loginData) => {
//   return await axios.post(`${url_flask_users}/login`, loginData, config);
// };

// export const createUser = async (data) => {
//   return await axios.post(`${url_flask_users}/signup`, data, config);
// };

// export const logoutUser = async () => {
//   return axios.post(`${url_flask_users}/logout`, config);
// };

// export const updateUserDetails = async (details) => {
//   return axios.put(`${url_flask_users}/update-details`, details, config);
// };
