export type User = {
  id: string;
  username?: string;
  email?: string;
  emailVerified?: boolean;
};

export type LoginResponse = {
  user: User;
  token: string;
};
