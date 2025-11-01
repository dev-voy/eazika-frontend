"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";
import Cookies from "js-cookie";
import { addUserToRedux } from "@/store/actions/userActions";
import { userType } from "@/types";

const Providers = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    const { accessToken, refreshToken } = Cookies.get();
    const user = localStorage.getItem("user");
    if (accessToken) {
      store.dispatch({
        type: "auth/setToken",
        payload: { accessToken, refreshToken },
      });
    }
    if (user) {
      store.dispatch({
        type: "user/setUser",
        payload: JSON.parse(user || "{}"),
      });
    }
    // If no user/token found, seed a default user in development for convenience
    if (process.env.NODE_ENV !== "production" && !user && !accessToken) {
      const defaultUser: userType = {
        id: "dev-user-1",
        name: "Dev User",
        email: "dev@eazika.local",
        phone: "+91 99999 00000",
        role: "CUSTOMER",
        profileImage: "/assests/images/profile-pic.jpeg",
        isActive: true,
        isVerified: true,
      } as userType;
      const defaultAccessToken = "dev-access-token-1234567890";
      const defaultRefreshToken = "dev-refresh-token-1234567890";
      addUserToRedux({ dispatch: store.dispatch, user: defaultUser, accessToken: defaultAccessToken, refreshToken: defaultRefreshToken });
    }
  });
  return (
    <>
      <ReduxProvider store={store}>
        {children}
        <Toaster richColors />
      </ReduxProvider>
    </>
  );
};

export default Providers;
