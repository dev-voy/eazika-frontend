/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthState extends AuthTokens {
  isAuthenticated: boolean;
}

export const authInitialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const initialState: AuthState = { ...authInitialState };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthTokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = Boolean(action.payload.accessToken);
    },
    clearToken: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});
// console.log("Auth Slice Loaded");

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
