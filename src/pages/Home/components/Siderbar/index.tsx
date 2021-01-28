import React, { useCallback, useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { setTheme } from "src/store/actions/system";
import { Theme } from "src/types";
import AccountBox from "src/compoents/achive/AccountBox";
import Switch from "src/compoents/widgets/Switch";
import { useAuth } from "src/hooks/useAuth";
import { confirm } from "src/compoents/widgets/Dialog";
const SiderBar: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.system.theme.current);
  const toggleTheme = useCallback(() => {
    dispatch(setTheme(theme === Theme.dark ? Theme.light : Theme.dark));
  }, [dispatch, theme]);
  const { profile, toggleLoginBox, logout } = useAuth();
  const [visisble, setVisible] = useState(false);
  const [isLogOuting, setIsLogoutIng] = useState(false);
  const exitLogin = async () => {
    try {
      await confirm("确认退出登录？");
      setIsLogoutIng(true);
      await logout();
    } catch (err) {
    } finally {
      setIsLogoutIng(false);
    }
  };
  return (
    <div className="siderbar-container">
      <span className="siderbar-toggle-btn" onClick={() => setVisible(true)}>
        <i className="iconfont icon-menu"></i>
      </span>
      <div className={"siderbar" + (visisble ? " show" : "")}>
        <div className="mask" onClick={() => setVisible(false)}></div>
        <div className="siderbar-content">
          <div className="siderbar-header">
            <AccountBox profile={profile} toggleLoginBox={toggleLoginBox} />
          </div>
          <div className="module-container">
            <div className="tool-item" onClick={toggleTheme}>
              <span className="iconfont icon-night"></span>
              <span className="title">暗黑模式</span>
              <Switch value={theme === Theme.dark} />
            </div>
          </div>
          {!!profile && (
            <div className="module-container">
              <button
                className="tool-item logout"
                onClick={exitLogin}
                disabled={isLogOuting}
              >
                <span>退出登录</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiderBar;
