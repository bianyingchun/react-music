import React from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { Profile } from "src/types";
interface Props {
  profile?: Profile;
  toggleLoginBox: (visible: boolean) => void;
}
const defaultAvatar = "https://profile.csdnimg.cn/4/A/E/0_weixin_39822244";
const AccountBox: React.FC<Props> = ({ profile, toggleLoginBox }) => {
  const history = useHistory();
  function onClick() {
    if (profile) {
      history.push("/user/" + profile.userId);
    } else {
      toggleLoginBox(true);
    }
  }
  return (
    <div className="account-box" onClick={onClick}>
      <img
        src={profile ? profile.avatarUrl : defaultAvatar}
        alt=""
        className="avatar"
      />
      <div className="text">
        <h3 className="nickname">{profile ? profile.nickname : "立即登录"}</h3>
        <span className="iconfont icon-right"></span>
      </div>
    </div>
  );
};

export default AccountBox;
