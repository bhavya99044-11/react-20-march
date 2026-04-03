import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
axios.defaults.baseURL = apiBaseUrl;
const api = axios.create({
  timeout: 1000,
});

api.interceptors.request.use(
  function (config) {
    Object.assign(config.headers, {
      "content-type": "Application/json",
    });
    // Do something before the request is sent
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    Object.assign(response.headers, {
      "content-type": "Application/json",
    });
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export { api };
