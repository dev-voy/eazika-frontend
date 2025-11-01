/** @format */

import Cookies from "js-cookie";

import { userType } from "@/types";
import { AppDispatch } from "..";
import { clearUser, setUser, userInitialState } from "@/store/slices/userSlice";
import { clearToken, setToken } from "@/store/slices/authSlice";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";
const USER_STORAGE_KEY = "user";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 7,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

const COOKIE_REMOVE_OPTIONS: Cookies.CookieAttributes = {
  path: "/",
};

const isBrowser = () => typeof window !== "undefined";

const persistUser = (user: userType) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const removePersistedUser = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(USER_STORAGE_KEY);
};

const readPersistedUser = (): userType | null => {
  if (!isBrowser()) return null;
  const stored = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as userType;
  } catch {
    return null;
  }
};

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export interface StartUserSessionOptions {
  dispatch: AppDispatch;
  user: userType;
  tokens: SessionTokens;
}

export const startUserSession = ({
  dispatch,
  user,
  tokens,
}: StartUserSessionOptions) => {
  persistUser(user);
  Cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, COOKIE_OPTIONS);
  Cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, COOKIE_OPTIONS);
  dispatch(setToken(tokens));
  dispatch(setUser(user));
};

export const hydrateUserSession = (dispatch: AppDispatch) => {
  if (!isBrowser()) return;
  const persistedUser = readPersistedUser();
  const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE) ?? null;
  const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE) ?? null;

  if (accessToken || refreshToken) {
    dispatch(setToken({ accessToken, refreshToken }));
  }

  if (persistedUser) {
    dispatch(setUser(persistedUser));
  }
};

export const endUserSession = (dispatch: AppDispatch) => {
  Cookies.remove(ACCESS_TOKEN_COOKIE, COOKIE_REMOVE_OPTIONS);
  Cookies.remove(REFRESH_TOKEN_COOKIE, COOKIE_REMOVE_OPTIONS);
  removePersistedUser();
  dispatch(clearToken());
  dispatch(clearUser());
};

export const updatePersistedUser = (
  dispatch: AppDispatch,
  partialUser: Partial<userType>
) => {
  const currentUser = readPersistedUser() ?? { ...userInitialState };
  const nextUser = { ...currentUser, ...partialUser } as userType;
  persistUser(nextUser);
  dispatch(setUser(nextUser));
};

export const hasActiveSession = () => {
  return Boolean(Cookies.get(ACCESS_TOKEN_COOKIE));
};

export const getPersistedUser = (): userType | null => readPersistedUser();
