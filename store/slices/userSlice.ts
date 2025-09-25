import { userType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userType = {
  id: "",
  name: "",
  email: "",
  phone: "",
  role: "customer",
  profileImage: null,
  isActive: false,
  isVerified: false,
  createdAt: "",
  updatedAt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
