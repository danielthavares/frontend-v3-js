import axios from "axios";
import { useAccountStore } from "../stores/account";
import { errorResponse } from "./errorAdapter";

export function httpClient() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ROOT,
  });

  const account = useAccountStore();

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = account.token
        ? `Bearer ${account.token}`
        : null;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      const res = err.response;
      if (res.status === 401) {
        if (window.location.pathname !== "/login")
          window.location.assign(
            `${import.meta.env.VITE_BASE_URL}unauthorized`
          );
      } else if (res.status === 403) {
        if (window.location.pathname !== "/forbidden")
          window.location.assign(`${import.meta.env.VITE_BASE_URL}forbidden`);
      }
      return Promise.reject(err);
    }
  );

  function get({ url, params, config, onSuccess, onError }) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params, ...config })
        .then((res) => {
          if (onSuccess) resolve(onSuccess(res.data));
          else resolve(res.data);
        })
        .catch((err) => {
          if (onError) reject(onError(err));
          else reject(errorResponse(err));
        });
    });
  }

  function post({ url, data, config, onSuccess, onError }) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, config)
        .then((res) => {
          if (onSuccess) resolve(onSuccess(res.data));
          else resolve(res.data);
        })
        .catch((err) => {
          if (onError) reject(onError(err));
          else reject(errorResponse(err));
        });
    });
  }

  function put({ url, data, config, onSuccess, onError }) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, data, config)
        .then((res) => {
          if (onSuccess) resolve(onSuccess(res.data));
          else resolve(res.data);
        })
        .catch((err) => {
          if (onError) reject(onError(err));
          else reject(errorResponse(err));
        });
    });
  }

  function patch({ url, data, config, onSuccess, onError }) {
    return new Promise((resolve, reject) => {
      instance
        .patch(url, data, config)
        .then((res) => {
          if (onSuccess) resolve(onSuccess(res.data));
          else resolve(res.data);
        })
        .catch((err) => {
          if (onError) reject(onError(err));
          else reject(errorResponse(err));
        });
    });
  }

  function remove({ url, config, onSuccess, onError }) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, config)
        .then((res) => {
          if (onSuccess) resolve(onSuccess(res.data));
          else resolve(res.data);
        })
        .catch((err) => {
          if (onError) reject(onError(err));
          else reject(errorResponse(err));
        });
    });
  }

  return {
    get,
    post,
    put,
    patch,
    remove,
  };
}
