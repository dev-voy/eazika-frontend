export type userType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "shopkeeper" | "delivery";
  profileImage?: string | null;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type registerUserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type loginUserType = {
  emailPhone: string;
  password: string;
};
