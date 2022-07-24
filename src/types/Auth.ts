export type UserLoginBodyType = {
  code: string;
};

export type GetUserData = {
  accessToken: string;
  scope: string;
  tokenType: string;
};
