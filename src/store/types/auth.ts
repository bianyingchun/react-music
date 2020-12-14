import { LoginStatus } from "../../types/user";

export const SET_IS_lOGINING = "SET_IS_lOGINING";
export const SET_ACCOUNT = "SET_ACCOUNT";
interface SetIsLogining {
  type: typeof SET_IS_lOGINING;
  payload: boolean;
}

interface SetAccount {
  type: typeof SET_ACCOUNT;
  payload: LoginStatus | null;
}

export type AuthActionTypes = SetIsLogining | SetAccount;

export interface AuthState extends LoginStatus {
  isLogining: boolean;
}
