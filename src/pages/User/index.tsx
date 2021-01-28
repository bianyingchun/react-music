import React, { useEffect, useState } from "react";
import {
  getUserDetail,
  getUserPlaylist,
  followUser,
} from "src/common/api/user";
import ProfilePage from "src/compoents/achive/ProfilePage";
import UserMusic from "src/compoents/achive/UserMusic";
import { toast } from "src/compoents/widgets/Toast";
import "./style.scss";
import { useRouteParamId } from "src/hooks/usePage";
import { UserDetail } from "src/types";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  let uid: number = useRouteParamId("user");
  const [state, setState] = useState<{
    userDetail: UserDetail | null;
    playlist: any;
  }>({
    userDetail: null,
    playlist: {},
  });
  useEffect(() => {
    async function getList() {
      const res = await Promise.all([getUserDetail(uid), getUserPlaylist(uid)]);
      setState({
        userDetail: res[0].data,
        playlist: res[1],
      });
    }
    if (uid) {
      getList();
    }
  }, [uid]);
  async function onToggleFollow(followed: boolean) {
    try {
      const res = await followUser(uid, followed);
      if (res.data.code === 200) {
        const userDetail = state.userDetail;
        if (userDetail) userDetail.profile.followed = followed;
        setState({ ...state, userDetail });
      } else {
        toast("操作失败");
      }
    } catch (err) {
      toast("操作失败");
    }
  }
  return (
    <ProfilePage
      userInfo={state.userDetail}
      onToggleFollow={onToggleFollow}
      main={
        <div className="scroller-container">
          <div className="module-container base-info">
            <div className="module-header">
              <h3 className="title">基本信息</h3>
            </div>
            {!!state.userDetail && (
              <div className="user-info">
                <div>昵称：{state.userDetail.profile.nickname}</div>
                <div>性别：{state.userDetail.profile.gender ? "男" : "女"}</div>
                <div>
                  简介：{state.userDetail.profile.signature || "暂无介绍"}
                </div>
              </div>
            )}
          </div>
          <UserMusic {...state.playlist}></UserMusic>
        </div>
      }
    ></ProfilePage>
  );
};
