"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";
import Cookies from "js-cookie";

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
