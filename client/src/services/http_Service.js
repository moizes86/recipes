import axios from "axios";

export const httpService = (
  method,
  url,
  Request,
) => {
  const data = Request;
  return axios({
    method: method,
    url: url,
    data,
    
  });
};
