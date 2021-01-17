import React from "react";
import "./style.scss";
import UserMusic from "src/compoents/achive/UserMusic";
import { UserDetail, Artist, Playlist } from "src/types";
interface Props {
  userInfo: UserDetail | null;
  artist: Artist | null;
  playlist: null | {
    created: Playlist[];
    faved: Playlist[];
    likelist?: Playlist;
  };
}
const ArtistProfile: React.FC<Props> = ({ userInfo, artist, playlist }) => {
  if (!userInfo && !artist) return null;
  return (
    <div className="scroller-container artist-profile">
      {userInfo && (
        <div className="module-container base-info">
          <div className="module-header">
            <h3 className="title">基本信息</h3>
          </div>
          <div className="content">
            <div>昵称：{userInfo.profile.nickname}</div>
            <div>性别：{userInfo.profile.gender ? "男" : "女"}</div>
            {userInfo.profile.signature && (
              <div>简介：{userInfo.profile.signature}</div>
            )}
          </div>
        </div>
      )}
      {artist && (
        <div className="module-container artist-desc">
          <div className="module-header">
            <h3 className="title">歌手简介</h3>
          </div>
          <div className="content">{artist.briefDesc}</div>
        </div>
      )}
      {!!playlist && <UserMusic {...playlist}></UserMusic>}
    </div>
  );
};
export default React.memo(ArtistProfile);
