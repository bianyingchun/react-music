import React, { useCallback } from "react";
import { RootState } from "src/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { login } from "src/store/actions/auth";
import { useInputValue } from "src/hooks/shared";
import "./style.scss";
const Login = () => {
  const { account, islogining, visible } = useSelector((state: RootState) => {
    return {
      account: state.auth.account,
      islogining: state.auth.isLogining,
      visible: state.auth.loginVisible,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const phone = useInputValue("");
  const password = useInputValue("");
  const doLogin = useCallback(
    (phone, string) => {
      dispatch(login(phone, string));
    },
    [dispatch]
  );

  if (account || !visible) return null;
  return (
    <div className="login-wraper">
      <div className="icon">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div className="login-info">
        <div className="form-item">
          <input type="text" {...phone} />
        </div>
        <div className="form-item">
          <input type="password" {...password} />
        </div>
        <div className="form-item">
          <button
            onClick={() => {
              doLogin(phone.value, password.value);
            }}
            className="login-btn"
            disabled={islogining}
          >
            一键登录
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
