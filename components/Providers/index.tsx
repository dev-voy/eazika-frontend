"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
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
