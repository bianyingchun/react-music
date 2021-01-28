import React from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Creative, Track } from "src/types";
import { usePlayMusic } from "src/hooks/usePlayer";
import { transformTrack } from "src/common/js/music";
interface Props {
  creatives: Creative[];
}

const CustomSongs: React.FC<Props> = ({ creatives }) => {
  const list: Track[] = [];
  const { currentSong, selectPlay } = usePlayMusic();
  creatives.forEach((item) => {
    item.resources.forEach((item) => {
      const song = item.resourceExtInfo.songData;
      if (song) {
        const track = transformTrack(song);
        song.index = list.length;
        list.push(track);
      }
    });
  });
  function onSelect(index?: number) {
    if (index === void 0) return;
    selectPlay(list, index);
  }
  return (
    <div className="custom-songs">
      <Swiper>
        {creatives.map((creative, index) => (
          <SwiperSlide key={index}>
            <div className="song-list">
              {creative.resources.map((item) => (
                <div
                  className="song-item"
                  key={item.resourceId}
                  onClick={() => onSelect(item.resourceExtInfo.songData?.index)}
                >
                  <div className="cover">
                    <img
                      src={item.resourceExtInfo.songData?.album.picUrl}
                      alt=""
                    />
                    {item.resourceExtInfo.songData &&
                    currentSong &&
                    currentSong.id === item.resourceExtInfo.songData.id ? (
                      <i className="iconfont icon-pause"></i>
                    ) : (
                      <i className="iconfont icon-play-fill"></i>
                    )}
                  </div>
                  <div className="text">
                    <div className="title">
                      <span className="name">
                        {item.resourceExtInfo.songData?.name}
                      </span>
                      <span className="artist">
                        -
                        {item.resourceExtInfo.songData?.artists
                          .map((item) => item.name)
                          .join("/")}
                      </span>
                    </div>
                    {item.uiElement.subTitle && (
                      <div className="sub-title">
                        {item.uiElement.subTitle.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSongs;
