/** @format */

// "use server";
import axios, { isAxiosError, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import store from "@/store";
import { endUserSession } from "@/store/actions/userActions";

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface InternalAxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Add interceptors for request and response
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.requiresAuth === false) {
      return config;
    }

    // Prefer token from Redux store (kept in memory) and fall back to cookie
    const reduxToken = store.getState?.().auth?.accessToken || null;
    const cookieToken = Cookies.get("accessToken") || null;
    const token = reduxToken || cookieToken;
    if (token) {
      if (typeof config.headers?.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        config.headers = {
          ...(config.headers as Record<string, unknown>),
          Authorization: `Bearer ${token}`,
        } as typeof config.headers;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      if (error.response.status === 401) {
        endUserSession(store.dispatch);
      }
      console.error(
        "API Error:",
        error.response.data.message || error.response.statusText
      );
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { isAxiosError };
