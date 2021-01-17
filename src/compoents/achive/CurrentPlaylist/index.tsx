import React from "react";
import { Track, PlayModeItem } from "src/types";

import "./style.scss";

interface Props {
  setCurrentSong: (song: Track) => void;
  currentSong: Track;
  sequenceList: Track[];
  mode: PlayModeItem;
  changeMode: () => void;
  cleatList: () => void;
  removeSong: (song: Track) => void;
}
const CurrentPlaylist: React.FC<Props> = ({
  setCurrentSong,
  currentSong,
  sequenceList,
  mode,
  changeMode,
  cleatList,
  removeSong,
}) => {
  return (
    <div className="current-playlist">
      <header>
        <div className="title">
          当前播放<span className="count">({sequenceList.length})</span>
        </div>
        <div className="tools">
          <div className="play-mode">
            <span
              className={"iconfont " + mode.icon}
              onClick={changeMode}
            ></span>
            {mode.text}
          </div>
          <div className="fav-btn">
            <span className="iconfont icon-add-box"></span>收藏全部
          </div>
          <div className="clear-btn">
            <span className="iconfont icon-delete"></span>
          </div>
        </div>
      </header>
      <main>
        <div>
          {sequenceList.map((song, index) => (
            <div
              key={index}
              className={
                currentSong.id === song.id ? "song-item active" : "song-item"
              }
            >
              <div
                className="content"
                onClick={(e) => {
                  setCurrentSong(song);
                  e.stopPropagation();
                }}
              >
                <span className="name">{song.name}</span>
                <span className="desc">
                  - {song.ar.map((item) => item.name).join("/")}
                </span>
              </div>
              <div className="play-flag">播放来源</div>
              <div className="tools">
                <span
                  className="iconfont icon-close"
                  onClick={(e) => {
                    removeSong(song);
                    e.stopPropagation();
                  }}
                ></span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CurrentPlaylist;
