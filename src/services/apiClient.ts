import axios, { AxiosRequestConfig } from "axios";
const isProd = import.meta.env.PROD;

interface ErrorResonse {
  code: string;
  message: string;
  details: string | null;
}

export interface FetchAllResponse<T> {
  success: boolean;
  count: number | null;
  next: string | null;
  previous: string | null;
  message: string;
  error: ErrorResonse | null;
  results: T[];
}

export interface FetchResponse<T> {
  success: boolean;
  message: string;
  error: ErrorResonse | null;
  result: T;
}

const axiosInstance = axios.create({
  baseURL:
    (isProd ? import.meta.env.VITE_BASE_URL : "http://localhost:4000") + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchAllResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  getById = (id: number | string) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint + "/" + id)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.data;
      });
  };

  get = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.data;
      });
  };

  post = <P>(payload: P) => {
    return axiosInstance
      .post<FetchResponse<T>>(this.endpoint, payload)
      .then((res) => res.data);
  };
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (
    //   error.response &&
    //   error.response.status === 401 &&
    //   error.response.data.token
    // ) {
    //   localStorage.clear();
    //   window.location.href =
    //     (isProd
    //       ? "https://expense-tracker-client-theta.vercel.app"
    //       : "http://localhost:5173") + "/auth/login";
    // }
    return Promise.reject(error);
  }
);

export default APIClient;
