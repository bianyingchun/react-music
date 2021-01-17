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
// const MyComponent = React.memo(function MyComponent(props) {
/* 使用 props 渲染 */
// });
// React.memo 为高阶组件。它与 React.PureComponent 非常相似，
// 但只适用于函数组件，而不适用 class 组件。

// 如果你的函数组件在给定相同 props 的情况下渲染相同的结果，
// 那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

// React.memo 仅检查 props 变更 如果函数组件被 React.memo 包裹，且其实现中拥有 useState 或 useContext 的 Hook，
// 当 context 发生变化时，它仍会重新渲染。
