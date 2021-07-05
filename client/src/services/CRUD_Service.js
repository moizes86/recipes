import { httpService } from "./http_Service";

export const httpGet = async (url, Request, includeToken) => {
  return await httpService("get", url, Request, includeToken);
};

export const httpPut = (url, Request, includeToken) => {
  return httpService("put", url, Request, includeToken);
};

export const httpPost = (url, Request, includeToken) => {
  return httpService("post", url, Request, includeToken);
};

export const httpDelete = (url, Request) => {
  httpService("delete", url, Request);
};
