import { Profile, Account, LoginStatus } from "src/types";

export const SET_IS_lOGINING = "SET_IS_lOGINING";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_LOGIN_VISIBLE = "SET_LOGIN_VISIBLE";
export const SET_AUTH_POSTRING = "SET_AUTH_POSTING";
interface SetAuthPosting {
  type: typeof SET_AUTH_POSTRING;
  payload: boolean;
}
interface SetIsLogining {
  type: typeof SET_IS_lOGINING;
  payload: boolean;
}
interface SetLoginVisible {
  type: typeof SET_LOGIN_VISIBLE;
  payload: boolean;
}
interface SetAccount {
  type: typeof SET_ACCOUNT;
  payload: LoginStatus | null;
}

export type AuthActionTypes =
  | SetIsLogining
  | SetAccount
  | SetLoginVisible
  | SetAuthPosting;

export interface AuthState {
  loginVisible: boolean;
  isLogining: boolean;
  logined: boolean;
  posting: boolean;
  account: Account | null;
  profile: Profile | null;
}
