import {
  AuthActionTypes,
  AuthState,
  SET_ACCOUNT,
  SET_IS_lOGINING,
} from "../types/auth";
const initialState: AuthState = {
  logined: false,
  profile: undefined,
  account: undefined,
  isLogining: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_ACCOUNT: {
      const { account, profile } = action.payload || {};
      return { account, logined: !!account, profile, isLogining: false };
    }
    case SET_IS_lOGINING:
      return { ...state, isLogining: action.payload };
    default:
      return state;
  }
};
