export type userType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "SHOPKEEPER" | "DELIVERY" | "ADMIN";
  profileImage?: string | null;
  isActive: boolean;
  isVerified: boolean;
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
