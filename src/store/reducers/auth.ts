import {
  AuthActionTypes,
  AuthState,
  SET_ACCOUNT,
  SET_AUTH_POSTRING,
  SET_IS_lOGINING,
  SET_LOGIN_VISIBLE,
} from "../types/auth";
const initialState: AuthState = {
  logined: false,
  profile: undefined,
  account: undefined,
  isLogining: false,
  loginVisible: false,
  posting: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_ACCOUNT: {
      const { account, profile } = action.payload || {};
      return {
        ...state,
        account,
        logined: !!account,
        profile,
        loginVisible: account ? false : state.loginVisible,
      };
    }
    case SET_IS_lOGINING:
      return { ...state, isLogining: action.payload };
    case SET_LOGIN_VISIBLE:
      return { ...state, loginVisible: action.payload };
    case SET_AUTH_POSTRING:
      return { ...state, posting: action.payload };
    default:
      return state;
  }
};
