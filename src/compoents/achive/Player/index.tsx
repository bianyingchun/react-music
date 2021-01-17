import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./style.scss";
import { timePraser } from "src/common/js/music";
import { usePlayer } from "src/hooks/usePlayer";
import { getSingerName, showSongAr } from "src/hooks/useSongAr";
import ProgressCircle from "src/compoents/widgets/ProgressCirlce";
import ProgressBar from "src/compoents/widgets/ProgressBar";
import CurrentPlaylist from "src/compoents/achive/CurrentPlaylist";
import BottomPanel from "../../widgets/BottomPanel";
import { favTrackToMix } from "../FavToMix";
const Player = () => {
  const {
    currentSong,
    currentLyric,
    playing,
    togglePlay,
    percent,
    cachePercent,
    currentTime,
    onUpdateTime,
    onPercentChange,
    audio,
    mode,
    changeMode,
    next,
    prev,
    onPause,
    onEnd,
    onPlay,
    lyric,
    isliked,
    toggleLike,
    sequenceList,
    clearList,
    setCurrentSong,
    removeSong,
    onError,
  } = usePlayer();
  const [fullScreen, setFullScreen] = useState(false);
  const [showLyric, setShowLyric] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [lyricHeightArr, setLyricHeightArr] = useState<number[]>([]);
  const mesureLyricHeight = useCallback(
    (node) => {
      if (node) {
        const ps = node.querySelectorAll(".lyric-item");
        let h = 0;
        const heightList: number[] = [];
        for (let i = 0; i < ps.length; i++) {
          heightList.push(h);
          h += ps[i].clientHeight;
        }
        setLyricHeightArr(heightList);
      } else {
        setLyricHeightArr([]);
      }
    },
    [lyric.data.lrc]
  );
  useEffect(() => {
    if (fullScreen) {
      setFullScreen(false);
    }
  }, [location]);
  useEffect(() => {
    if (lyricHeightArr.length) {
      const top = lyricHeightArr[lyric.currentIndex];
      const wraper = document.querySelector(".lyric-wraper");
      if (wraper) {
        wraper.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }
  }, [lyric.currentIndex, lyricHeightArr]);

  const [listVisible, setListVisible] = useState(false);
  if (!currentSong.id) return null;
  return (
    <div className="player-container">
      <div className="player" onClick={() => setFullScreen(true)}>
        <div className="icon">
          <img src={currentSong.al.picUrl} alt="" />
        </div>
        <div className="text">
          <div className="name">{currentSong.name}</div>
          <div className="lyric">{currentLyric}</div>
        </div>
        <div className={playing ? "control playing" : "control"}>
          <ProgressCircle
            percent={percent}
            radius={36}
            onClick={(e) => {
              togglePlay();
              e.stopPropagation();
            }}
          >
            {playing ? (
              <span className="iconfont icon-pause icon-mini"></span>
            ) : (
              <span className="iconfont icon-play icon-mini"></span>
            )}
          </ProgressCircle>
        </div>
        <div
          className="control"
          onClick={(e) => {
            setListVisible(true);
            e.stopPropagation();
          }}
        >
          <span className="iconfont icon-play-list"></span>
        </div>
      </div>
      <div
        className="full-player"
        style={{ display: fullScreen ? "block" : "none" }}
      >
        <div
          className="bg"
          style={{ backgroundImage: `url(${currentSong.al.picUrl})` }}
        ></div>
        <div className="content">
          <header>
            <span
              className="iconfont icon-back"
              onClick={() => setFullScreen(false)}
            ></span>
            <div className="title">
              <div className="name">
                <span>{currentSong.name}</span>
              </div>
              <div
                className="singer"
                onClick={() => showSongAr(currentSong, history)}
              >
                {getSingerName(currentSong) + ">"}
              </div>
            </div>
            <span className="iconfont icon-share"></span>
          </header>
          <main
            onClick={() => {
              setShowLyric(!showLyric);
            }}
          >
            <div
              className="disc-wraper"
              style={{ visibility: showLyric ? "hidden" : "visible" }}
            >
              <div className={playing ? "m-song-disc playing" : "m-song-disc"}>
                <img className="image" src={currentSong.al.picUrl} alt="" />
              </div>
              <div
                className="player-toolbar"
                onClick={(e) => e.stopPropagation()}
              >
                {isliked ? (
                  <div className="tool-item" onClick={() => toggleLike(false)}>
                    <span className="iconfont icon-fav-fill"></span>
                  </div>
                ) : (
                  <div className="tool-item" onClick={() => toggleLike(true)}>
                    <span className="iconfont icon-fav"></span>
                  </div>
                )}

                <Link
                  className="tool-item"
                  to={`/comment/music/${currentSong.id}`}
                >
                  <span className="iconfont icon-comment"></span>
                </Link>
                <div
                  className="tool-item"
                  onClick={() => favTrackToMix(currentSong)}
                >
                  <span className="iconfont icon-add-box"></span>
                </div>
              </div>
            </div>
            <div
              className="lyric-wraper"
              style={{ visibility: showLyric ? "visible" : "hidden" }}
            >
              {!!lyric.data.lrc ? (
                <div className="lyric-list" ref={mesureLyricHeight}>
                  {lyric.data.lrc.map((item, index) => (
                    <div
                      key={index}
                      className={
                        lyric.currentIndex === index
                          ? "lyric-item active"
                          : "lyric-item"
                      }
                    >
                      {item.value}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-lyric">纯音乐请欣赏</div>
              )}
            </div>
          </main>
          <footer>
            <div className="progress-wrapper">
              <span className="time time-l">{timePraser(currentTime)}</span>
              <div className="progress-bar-wrapper">
                <ProgressBar
                  cachePercent={cachePercent}
                  percent={percent}
                  onChange={onPercentChange}
                ></ProgressBar>
              </div>
              <span className="time time-r">{timePraser(currentSong.dt)}</span>
            </div>
            <div className="operators">
              <span
                className={"iconfont " + mode.icon}
                onClick={changeMode}
              ></span>
              <span className="iconfont icon-play-prev" onClick={prev}></span>
              <div className="play-btn" onClick={togglePlay}>
                {playing ? (
                  <span className="iconfont icon-pause"></span>
                ) : (
                  <span className="iconfont icon-play-fill"></span>
                )}
              </div>
              <span className="iconfont icon-play-next" onClick={next}></span>
              <span
                className="iconfont icon-play-list"
                onClick={() => setListVisible(true)}
              ></span>
              {/* <play-list></play-list> */}
            </div>
          </footer>
        </div>
      </div>
      <audio
        ref={audio}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnd}
        onError={onError}
        onTimeUpdate={onUpdateTime}
      ></audio>
      <BottomPanel show={listVisible} onHide={() => setListVisible(false)}>
        <CurrentPlaylist
          sequenceList={sequenceList}
          cleatList={clearList}
          mode={mode}
          changeMode={changeMode}
          removeSong={removeSong}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </BottomPanel>
    </div>
  );
};
export default Player;
