import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import LocalStorageService from "@/utils/LocalStorageService.ts";
import { ITokens } from "@/api/auth/types.ts";
import { isDefined } from "@/utils";

const axiosInstance = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getTokensLocalStorage = () => {
  const accessToken = LocalStorageService.getValue("accessToken");
  const refreshToken = LocalStorageService.getValue("refreshToken");

  return { accessToken, refreshToken };
};

const clearTokensLocalStorage = () => {
  LocalStorageService.remove("accessToken");
  LocalStorageService.remove("refreshToken");
};

const setTokensLocalStorage = (tokens: ITokens) => {
  if (isDefined(tokens)) {
    LocalStorageService.setValue("accessToken", tokens.accessToken);
    LocalStorageService.setValue("refreshToken", tokens.refreshToken);
  } else {
    clearTokensLocalStorage();
  }
};

const refreshTokensAuth = (failedRequest) => {
  const tokens = getTokensLocalStorage();

  if (tokens?.refreshToken && !window.location.href.includes("auth")) {
    return refreshToken(tokens.refreshToken)
      .then((respTokens) => {
        setTokensLocalStorage(respTokens.data);
        failedRequest.response.config.headers["Authorization"] =
          `Bearer ${respTokens?.data?.accessToken}`;

        return Promise.resolve();
      })
      .catch((err) => {
        clearTokensLocalStorage();
        validateCurrentUrl();

        return Promise.reject(err);
      });
  } else {
    validateCurrentUrl(false);

    if (!window.location.href.includes("auth"))
      window.location.replace("/app/auth/signUp");

    return Promise.reject(failedRequest);
  }
};

const authHeaders = () => {
  const tokens = getTokensLocalStorage();

  if (isDefined(tokens)) {
    return { Authorization: `Bearer ${tokens.accessToken}` };
  } else {
    return {};
  }
};

const validateCurrentUrl = (isRedirect: boolean = true) => {
  const path = window.location.pathname;

  LocalStorageService.setValue("lastPathUrl", path);

  if (isRedirect) {
    window.location.replace(path.includes("auth") ? path : "/app/auth/signIn");
  }
};

axiosInstance.interceptors.request.use((config) => {
  const tokens = getTokensLocalStorage();

  if (tokens?.refreshToken && tokens?.accessToken) {
    const headers = authHeaders();
    let localHeaders = { ...config.headers, ...headers };

    if (config.url.includes("/auth/refresh")) {
      localHeaders = {
        ...localHeaders,
        Authorization: `Bearer ${tokens.refreshToken}`,
      };
    }

    config.headers = { ...localHeaders };
  }

  return config;
});

async function refreshToken(refreshToken: string) {
  const url = "/auth/refresh";

  const response = await axiosInstance.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return response.data;
}

createAuthRefreshInterceptor(axiosInstance, refreshTokensAuth, {
  statusCodes: [401, 403],
});

export default axiosInstance;
