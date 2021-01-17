import React, { useCallback, useRef, useState } from "react";
import "./style.scss";
import { Artist, UserDetail } from "src/types";
import { useBack } from "src/hooks/shared";
import { Link } from "react-router-dom";
import { confirm } from "src/compoents/widgets/Dialog";
interface Props {
  //   bgPic: String;
  userInfo: UserDetail | null;
  artist?: Artist | null;
  navbar?: React.ReactNode;
  main: React.ReactNode;
  onToggleFollow: (followed: boolean) => void;
}

const ProfilePage: React.FC<Props> = ({
  userInfo,
  navbar,
  main,
  artist,
  onToggleFollow,
}) => {
  const { back } = useBack();
  const container = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const mesureHeaderHeight = useCallback((node: HTMLDivElement) => {
    if (node) {
      let h = node.clientHeight;
      const el = node.parentNode?.querySelector(".profile-header");
      if (el) h += el.clientHeight;
      console.log(h);
      setHeaderHeight(h);
    }
    return;
  }, []);
  const [titleOpacity, setTitleOpacity] = useState(0);
  if (!userInfo && !artist) return null;
  const followed =
    (userInfo && userInfo.profile.followed) || (artist && artist.followed);
  function onUnFollow() {
    confirm("确定取消关注？").then(() => onToggleFollow(false));
  }
  function onScroll() {
    if (container.current) {
      const top = container.current.scrollTop;
      const ratio = parseFloat(
        Math.min(1, top / (headerHeight - 60)).toFixed(2)
      );
      setTitleOpacity(ratio);
      console.log(ratio);
      setScrollable(ratio >= 0.99);
    }
  }
  return (
    <div
      className="profile-page page-container"
      onScroll={onScroll}
      ref={container}
    >
      <div className="title-bar">
        <div className="title-bg" style={{ opacity: titleOpacity }}></div>
        <span className="iconfont icon-back" onClick={back}></span>
        <span className="title">
          {(userInfo ? userInfo.profile.nickname : "") ||
            (artist ? artist.name : "")}
        </span>
      </div>
      <div className="profile-bg" ref={mesureHeaderHeight}>
        <img
          alt=""
          src={
            (artist ? artist.picUrl : "") ||
            (userInfo ? userInfo.profile.backgroundUrl : "")
          }
        />
        <div className="mask"></div>
      </div>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header-bg"></div>
          {userInfo && (
            <img alt="" src={userInfo.profile.avatarUrl} className="avatar" />
          )}
          <div className="profile-header-content">
            <h2 className="nickname">
              {(userInfo ? userInfo.profile.nickname : "") ||
                (artist ? artist.name : "")}
            </h2>
            {userInfo ? (
              <div className="stat-list">
                <Link
                  to={`/user/${userInfo.profile.userId}/follows`}
                  className="stat-item"
                >
                  {userInfo.profile.follows}
                  <span className="stat-text">关注</span>
                </Link>
                <div className="divide"></div>
                <Link
                  to={`/user/${userInfo.profile.userId}/followeds`}
                  className="stat-item"
                >
                  {userInfo.profile.followeds}
                  <span className="stat-text">粉丝</span>
                </Link>
                <div className="divide"></div>
                <span className="stat-item"> Lv.{userInfo.level}</span>
              </div>
            ) : (
              <div className="stat-list"></div>
            )}
            <div className="action-box">
              {followed ? (
                <button
                  type="button"
                  className="follow-status"
                  onClick={onUnFollow}
                >
                  已关注
                </button>
              ) : (
                <button
                  type="button"
                  className="follow-status unfollowed"
                  onClick={() => onToggleFollow(true)}
                >
                  <i className="iconfont icon-add"></i>关注
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={"profile-main" + (scrollable ? "" : " unscrollable")}>
          {!!navbar && <div className="profile-navbar">{navbar}</div>}
          <div className="profile-swiper">{main}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
