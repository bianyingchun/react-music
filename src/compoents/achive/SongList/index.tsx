import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { Track, TrackId } from "src/types";
import { getSingerName, showSongAr } from "src/hooks/useSongAr";
import ToolPanel from "src/compoents/achive/toolPanel";
import { favTrackToMix } from "src/compoents/achive/FavToMix";

interface SongListProps {
  list: Track[];
  trackIds?: TrackId[];
  inToplist?: Boolean;
  rank?: Boolean;
  currentItem?: Track;
  canDelete?: Boolean;
  onDelete?: (t: Track) => void;
  onSelect: (list: Track[], index: number) => void;
}

function getUpdateRank(index: number, trackIds: TrackId[]) {
  const info = {
    isNew: false,
    up: 0,
    down: 0,
  };
  const lr = trackIds[index].lr;
  if (lr === undefined) {
    info.isNew = true;
  } else {
    const r = index - lr;
    if (r > 0) {
      info.down = r;
    } else {
      info.up = 0 - r;
    }
  }
  return info;
}

const SongList: React.FC<SongListProps> = ({
  list,
  currentItem,
  trackIds = [],
  inToplist = false,
  rank = false,
  canDelete = false,
  onSelect,
  onDelete,
}) => {
  const history = useHistory();
  function RankUpdate(index: number) {
    const { up, down, isNew } = getUpdateRank(index, trackIds);
    if (isNew) {
      return <span className="iconfont icon-new new">new</span>;
    }
    if (up) {
      return (
        <span>
          <i className="iconfont icon-up">+</i>
          {up}
        </span>
      );
    }
    if (down) {
      return (
        <span>
          <i className="iconfont icon-down">-</i>
          {down}
        </span>
      );
    }
    return (
      <span>
        <i> - </i>
      </span>
    );
  }

  function getTools(song: Track) {
    const list = [
      {
        text: "收藏到歌单",
        icon: "icon-add-box",
        action() {
          favTrackToMix(song);
        },
      },
      {
        icon: "icon-singer",
        text: "歌手:" + getSingerName(song),
        action() {
          showSongAr(song, history);
        },
      },
      {
        icon: "icon-album",
        text: "专辑:" + song.al.name,
        action() {
          console.log("to do go album page");
        },
      },
    ];
    if (canDelete) {
      list.push({
        icon: "icon-delete",
        text: "删除",
        action() {
          onDelete && onDelete(song);
          // emit("delete", song);
        },
      });
    }
    return list;
  }
  return (
    <div className="song-list">
      {list.map((song, index) => {
        return (
          <div
            className={
              currentItem && currentItem.id === song.id
                ? "song-item active"
                : "song-item"
            }
            key={index}
            onClick={() => onSelect(list, index)}
          >
            {rank ? (
              <div className={inToplist && index < 3 ? "rank active" : "rank"}>
                <div className="num">{index + 1}</div>
                {inToplist && RankUpdate(index)}
              </div>
            ) : song.al.picUrl ? (
              <img src={song.al.picUrl} className="pic" alt="" />
            ) : null}
            <div className="content">
              <div className="name">
                {song.name}
                {!!song.alia.length && <span>({song.alia[0]})</span>}
              </div>
              <div className="desc">
                {song.fee === 1 && <span className="fee">vip</span>}
                <span className="singer-album">
                  {getSingerName(song) + "-" + song.al.name}
                </span>
              </div>
            </div>
            <div
              className="tools"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ToolPanel
                list={getTools(song)}
                title={`歌曲: ${song.name}`}
              ></ToolPanel>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SongList;
