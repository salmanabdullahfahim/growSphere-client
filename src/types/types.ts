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
