import { userType } from "@/types";
import { AppDispatch } from "../index";
import { setUser, clearUser } from "../slices/userSlice";
import { addTokenToRedux, removeTokenFromRedux } from "./authActions";

const addUserToRedux =
  (user: userType, refreshToken = "", accessToken = "") =>
  (dispatch: AppDispatch) => {
    localStorage.setItem("user", JSON.stringify(user));
    addTokenToRedux(refreshToken, accessToken);
    dispatch(setUser(user));
  };

const removeUserFromRedux = () => (dispatch: AppDispatch) => {
  removeTokenFromRedux();
  localStorage.removeItem("user");
  dispatch(clearUser());
};

export { addUserToRedux, removeUserFromRedux };
