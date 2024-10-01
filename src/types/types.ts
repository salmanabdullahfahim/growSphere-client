export type SignUpUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
};

export type SignInUser = {
  email: string;
  password: string;
};

export interface TUser {
  name: string;
  email: string;
  profileImage: string;
  password: string;
  phone: string;
  role: "user" | "admin";
  followers: TUser[];
  following: TUser[];
  favoritesPosts: [];
  isVerified?: boolean;
}
