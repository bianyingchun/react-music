import { RootState } from "src/store";
import { Dispatch } from "redux";
import { loginByPhone, getAccount, logout } from "../../common/api/user";
import {
  AuthActionTypes,
  SET_ACCOUNT,
  SET_IS_lOGINING,
  SET_LOGIN_VISIBLE,
  SET_AUTH_POSTRING,
} from "../types/auth";
import { LoginStatus } from "../../types";
import { fetchMyPlaylist, clearUserPlaylist } from "./playlist";
import { toast } from "src/compoents/widgets/Toast";

export const setLogining = (value: boolean): AuthActionTypes => ({
  type: SET_IS_lOGINING,
  payload: value,
});

export const setPosting = (value: boolean): AuthActionTypes => ({
  type: SET_AUTH_POSTRING,
  payload: value,
});
export const setAccount = (payload: LoginStatus | null): AuthActionTypes => ({
  type: SET_ACCOUNT,
  payload,
});

export const setLoginVisible = (payload: boolean): AuthActionTypes => ({
  type: SET_LOGIN_VISIBLE,
  payload,
});
export const login = (phone: string, password: string) => async (
  dispatch: Dispatch<any>,
  getState: () => RootState
) => {
  try {
    if (getState().auth.isLogining) return;
    dispatch(setLogining(true));
    const res = await loginByPhone({ phone, password });
    if (res.data.code !== 200) {
      toast(res.data.message || res.data.msg || "登录失败");
    } else {
      dispatch(setAccount(res.data));
      dispatch(fetchMyPlaylist());
    }
  } catch (err) {
    toast("登录失败");
    dispatch(setAccount(null));
  } finally {
    setLogining(false);
  }
};

export const checkLogin = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await getAccount();
    dispatch(setAccount(res.data));
    dispatch(fetchMyPlaylist());
  } catch (err) {
    dispatch(setAccount(null));
  }
};

export const exitLogin = () => async (
  dispatch: Dispatch<any>,
  getState: () => RootState
) => {
  try {
    if (getState().auth.posting) return;
    dispatch(setPosting(true));
    const res = await logout();
    dispatch(setAccount(null));
    dispatch(clearUserPlaylist());
    return res;
  } catch (err) {
    toast("登出失败");
  } finally {
    dispatch(setPosting(false));
  }
};
