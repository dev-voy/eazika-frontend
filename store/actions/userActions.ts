import { userType } from "@/types";
import { AppDispatch } from "..";
import { setUser, clearUser } from "@/store/slices/userSlice";
import { setToken, clearToken } from "@/store/slices/authSlice";
import Cookies from "js-cookie";

// const addUserToRedux =
//   (user: userType, refreshToken = "", accessToken = "") =>
//   (dispatch: AppDispatch) => {
//     console.log("Adding user to redux:", user);
//     localStorage.setItem("user", JSON.stringify(user));
//     addTokenToRedux(refreshToken, accessToken);
//     console.log("Dispatching setUser with:", user);
//     dispatch(setUser(user));
//   };

// const removeUserToRedux = () => (dispatch: AppDispatch) => {
//   removeTokenFromRedux();
//   localStorage.removeItem("user");
//   dispatch(clearUser());
// };

interface addUserToReduxParams {
  dispatch: AppDispatch;
  user: userType;
  refreshToken: string;
  accessToken: string;
}

const addUserToRedux = (addUserToReduxParams: addUserToReduxParams) => {
  const { dispatch, user, refreshToken, accessToken } = addUserToReduxParams;

  localStorage.setItem("user", JSON.stringify(user));
  dispatch(setToken({ refreshToken, accessToken }));
  dispatch(setUser(user));
  Cookies.set("accessToken", accessToken, { expires: 7, path: "*" });
  Cookies.set("refreshToken", refreshToken, { expires: 7, path: "*" });
};

const removeUserToRedux = (dispatch: AppDispatch) => {
  Cookies.remove("accessToken", { path: "*" });
  Cookies.remove("refreshToken", { path: "*" });
  localStorage.removeItem("user");
  dispatch(clearToken());
  dispatch(clearUser());
};

export { addUserToRedux, removeUserToRedux };
