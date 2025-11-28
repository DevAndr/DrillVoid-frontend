import { User } from "@telegram-apps/sdk-react";

export type SignInPayload = {
  initData: string;
};

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type AuthUser = User & {
  isNewUser: boolean;
};

export type AuthResponse = {
  user: AuthUser;
  tokens: ITokens;
};
