import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
// import router from '@/router'
const instance = axios.create({ timeout: 1000 * 10 });
instance.defaults.baseURL = "http://localhost:3000";
instance.defaults.withCredentials = true;
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err) => {
    if (err.response) {
      const { config, status } = err.response;
      if (config.url !== "/user/account" && status === 301) {
        // router.push('/login')
        // todo
      }
    }
    return Promise.reject(err);
  }
);

type TAxiosMethod = "get" | "GET" | "POST" | "post";

function request<T>(
  url: string,
  method: TAxiosMethod,
  params: object = {}
): AxiosPromise<T> {
  const args = params || {};
  const requestData = {
    url,
    method,
    data: {},
    params: {},
  };
  if (method === "get" || method === "GET") {
    requestData.params = args;
  } else {
    requestData.data = args;
  }
  return instance(requestData);
}

export default request;
