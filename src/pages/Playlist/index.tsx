import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import MixPage from "src/compoents/achive/MixPage";
import SongList from "src/compoents/achive/SongList";
import { usePlayMusic } from "src/hooks/usePlayer";
import { usePlaylistDetail } from "src/hooks/usePlaylist";
import { useRouteParamId } from "src/hooks/usePage";
// eslint-disable-next-line import/no-anonymous-default-export
const PlaylistPage = () => {
  let pid: number = useRouteParamId();
  const {
    playlist,
    toggleSubscribe,
    isMine,
    deleteTrackFromPlaylist,
  } = usePlaylistDetail(pid);
  const { selectPlay, currentSong } = usePlayMusic();

  if (!playlist) return <div>loading</div>;
  return (
    <MixPage
      title={playlist.name || "歌单列表"}
      bgPic={playlist.coverImgUrl}
      onPlayAll={() => selectPlay(playlist.tracks, 0)}
      header={
        <div className="playlist-container">
          <div className="playlist-info">
            <div
              className="cover"
              style={{ backgroundImage: `url(${playlist.coverImgUrl})` }}
            ></div>
            <div className="content">
              <h3 className="title">{playlist.name}</h3>
              <Link className="creator" to={"/user/" + playlist.creator.userId}>
                <img
                  src={playlist.creator.avatarUrl}
                  alt=""
                  className="avatar"
                />
                <span className="nickname">{playlist.creator.nickname}</span>
                {/* <span className="iconfont icon-right"></span> */}
              </Link>
              <div className="desc">
                <div className="text">{playlist.description}</div>
                <span className="iconfont icon-right"></span>
              </div>
            </div>
          </div>
          <div className="toolbar">
            {!isMine ? (
              <div className="tool-item" onClick={toggleSubscribe}>
                <i
                  className={
                    playlist.subscribed
                      ? "iconfont icon-fav-fill"
                      : "iconfont icon-fav"
                  }
                ></i>
                {playlist.subscribedCount}
              </div>
            ) : (
              <div className="tool-item disabled">
                <i className="iconfont icon-fav"></i>
                收藏
              </div>
            )}
            <Link className="tool-item" to={`/comment/playlist/${playlist.id}`}>
              <i className="iconfont icon-comment"></i>
              {playlist.commentCount ? playlist.commentCount : "评论"}
            </Link>
            <div className="tool-item">
              <i className="iconfont icon-share"></i>
              {playlist.shareCount ? playlist.shareCount : "分享"}
            </div>
          </div>
        </div>
      }
      main={
        playlist ? (
          <SongList
            rank={true}
            list={playlist.tracks}
            onSelect={selectPlay}
            currentItem={currentSong}
            canDelete={isMine}
            onDelete={deleteTrackFromPlaylist}
          />
        ) : null
      }
    ></MixPage>
  );
};
export default PlaylistPage;
