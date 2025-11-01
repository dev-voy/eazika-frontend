/** @format */

import { userType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userInitialState: userType = {
  id: "",
  name: "",
  email: "",
  phone: "",
  role: "CUSTOMER",
  profileImage: null,
  isActive: false,
  isVerified: false,
};

const initialState: userType = { ...userInitialState };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<userType>) => {
      return { ...userInitialState, ...action.payload };
    },
    clearUser: () => ({ ...userInitialState }),
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
