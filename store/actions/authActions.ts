import { setToken, clearToken } from "../slices/authSlice";
import { AppDispatch } from "..";

const addTokenToRedux =
  (accessToken: string, refreshToken: string) => (dispatch: AppDispatch) => {
    dispatch(setToken({ accessToken, refreshToken }));
  };

const removeTokenFromRedux = () => (dispatch: AppDispatch) => {
  dispatch(clearToken());
};

export { addTokenToRedux, removeTokenFromRedux };
