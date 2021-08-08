import axios from "axios";

export const httpService = (method, url, data) => {
  return axios({
    method: method,
    url: url,
    data,
    headers: { "Access-Control-Allow-Origin": "http://localhost:5000" },
    withCredentials: true,
  });
};
