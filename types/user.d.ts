export type userType = {
  id: string;
  phone: string;
  email: string;
  password: string;
  name: string;
  role: "customer" | "shopkeeper" | "delivery";
  profileImage?: string | null;
  isActive: boolean;
  isVerified: boolean;
  deviceTokens: string[];
};

export type registerUserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type loginUserType = {
  email: string;
  password: string;
};
