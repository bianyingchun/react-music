import React from "react";
import "./style.scss";
import SongList from "src/compoents/achive/SongList";
import { Track } from "src/types";
import { usePlayMusic } from "src/hooks/usePlayer";
import { Link } from "react-router-dom";
interface Props {
  more?: boolean;
  artistId: number;
  list: Track[];
}

const TopMusic: React.FC<Props> = ({ more = false, artistId, list }) => {
  const { selectPlay, currentSong } = usePlayMusic();
  return (
    <div className="scroller-container hot-song-list">
      <div className="hot-songs">
        <SongList
          list={list}
          rank={true}
          onSelect={selectPlay}
          currentItem={currentSong}
        ></SongList>
      </div>
      {more && (
        <Link
          className="more-music-link"
          v-if="more"
          to={`/artist/${artistId}/music`}
        >
          全部歌曲 <i className="iconfont icon-right"></i>
        </Link>
      )}
    </div>
  );
};

export default TopMusic;
