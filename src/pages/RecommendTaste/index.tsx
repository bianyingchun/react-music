import React, { useEffect, useState } from "react";
import "./style.scss";
import SongList from "src/compoents/achive/SongList";
import MixPage from "src/compoents/achive/MixPage";
import { Track } from "src/types";
import { usePlayMusic } from "src/hooks/usePlayer";
import { getRecommendSongs } from "src/common/api/discovery";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Track[]>([]);
  const { selectPlay, currentSong } = usePlayMusic();
  const time = new Date();
  useEffect(() => {
    async function getList() {
      setLoading(true);
      const res = await getRecommendSongs();
      setLoading(false);
      setList(res);
    }
    getList();
  }, []);

  return (
    <MixPage
      title="每日推荐"
      bgPic={list.length ? list[0].al.picUrl : ""}
      onPlayAll={() => selectPlay(list, 0)}
      header={
        <div className="daily-recommend-info">
          <div className="time">
            <span className="date">{time.getDate()}</span>
            <span className="divide">/</span>
            <span className="month"> {time.getMonth() + 1}</span>
          </div>
          <div className="text">
            <h3 className="title">每日歌曲推荐</h3>
            <div className="desc">根据你的音乐口味生成，每日6点更新</div>
          </div>
        </div>
      }
      main={
        <SongList list={list} currentItem={currentSong} onSelect={selectPlay} />
      }
    ></MixPage>
  );
};
