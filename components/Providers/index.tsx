"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Provider as ReduxProvider } from "react-redux";

import store from "@/store";
import { useAppDispatch } from "@/store/hooks";
import {
  getPersistedUser,
  hasActiveSession,
  hydrateUserSession,
  startUserSession,
} from "@/store/actions/userActions";
import { userType } from "@/types";

const SessionHydrator = () => {
  const dispatch = useAppDispatch();
  const hydratedRef = React.useRef(false);

  React.useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    hydrateUserSession(dispatch);

    const shouldSeedDevUser =
      process.env.NODE_ENV !== "production" &&
      process.env.NEXT_PUBLIC_ENABLE_DEV_SEED === "true";

    if (shouldSeedDevUser) {
      const hasSession = hasActiveSession() || Boolean(getPersistedUser());
      if (!hasSession) {
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

        startUserSession({
          dispatch,
          user: defaultUser,
          tokens: {
            accessToken: "dev-access-token-1234567890",
            refreshToken: "dev-refresh-token-1234567890",
          },
        });
      }
    }
  }, [dispatch]);

  return null;
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <SessionHydrator />
      {children}
      <Toaster richColors />
    </ReduxProvider>
  );
};

export default Providers;
