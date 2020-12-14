import { Dispatch } from "redux";
import { loginByPhone, getAccount } from "../../common/api/user";
import { AuthActionTypes, SET_ACCOUNT, SET_IS_lOGINING } from "../types/auth";
import { LoginStatus } from "../../types";
export const setLogining = (value: boolean): AuthActionTypes => ({
  type: SET_IS_lOGINING,
  payload: value,
});

export const setAccount = (payload: LoginStatus | null): AuthActionTypes => ({
  type: SET_ACCOUNT,
  payload,
});

export const login = (phone: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLogining(true));
    const res = await loginByPhone({ phone, password });
    dispatch(setAccount(res.data));
  } catch (err) {
    dispatch(setAccount(null));
  }
};

export const checkLogin = () => async (dispatch: Dispatch) => {
  try {
    const res = await getAccount();
    dispatch(setAccount(res.data));
  } catch (err) {
    dispatch(setAccount(null));
  }
};
