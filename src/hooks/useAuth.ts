import { RootState } from "src/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useCallback, useEffect } from "react";
import { setLoginVisible, exitLogin, checkLogin } from "src/store/actions/auth";
import { useHistory } from "react-router-dom";
export const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { account, profile } = useSelector(
    (state: RootState) => ({
      account: state.auth.account,
      profile: state.auth.profile,
    }),
    shallowEqual
  );
  const toggleLoginBox = useCallback(
    (visible: boolean) => {
      dispatch(setLoginVisible(visible));
    },
    [dispatch]
  );
  const logout = useCallback(async () => {
    await dispatch(exitLogin());
  }, [dispatch, history]);
  return { toggleLoginBox, account, profile, logout };
};

export const useLoginStatus = () => {
  const dispatch = useDispatch();
  const logined = useSelector((state: RootState) => state.auth.logined);
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);
  return logined;
};
