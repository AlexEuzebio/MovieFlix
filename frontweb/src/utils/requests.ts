import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import history from "./history";
import { getAuthData } from "./storage";

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ??
  "https://movieflix-devsuperior.herokuapp.com";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? "myclientid";
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? "myclientsecret";

type LoginData = {
  username: string;
  password: string;
};

export const requestBackEndLogin = (loginData: LoginData) => {
  const headers = {
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: "password",
  });

  const params: AxiosRequestConfig = {
    method: "POST",
    baseURL: BASE_URL,
    url: "/oauth/token",
    data: data,
    headers: headers,
  };
  return requestBackEnd(params);
};

export const requestBackEnd = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer " + getAuthData().access_token,
      }
    : config.headers;
  return axios({...config, headers, baseURL: BASE_URL});
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 401 || error.response.status === 403) {
      history.push("/");
    }

    return Promise.reject(error);
  }
);
