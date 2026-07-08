export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthSession = {
  userId: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};
