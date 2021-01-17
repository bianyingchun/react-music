import { RootState } from "src/store";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { PLAY_MODE_LIST } from "src/common/js/config";
import { checkSong } from "src/common/api/song";
import {
  setPlayState,
  updateTime,
  fetchLyric,
  togglePlayMode,
  playSong,
  playNext,
  playPrev,
  selectPlay,
  clear,
  deleteSong,
  insertSong,
} from "src/store/actions/player";
import { toggleLikeSong } from "src/store/actions/playlist";
import { PlayMode, PlayModeItem, Track } from "src/types";
import { toast } from "src/compoents/widgets/Toast";
function getSource(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
export function usePlayerMode(): [PlayModeItem, () => void] {
  const mode = useSelector((state: RootState) => state.player.mode);
  const dispatch = useDispatch();
  const changeMode = useCallback(() => {
    dispatch(togglePlayMode());
  }, [dispatch]);
  return [PLAY_MODE_LIST[mode], changeMode];
}
export function usePlayer() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();
  const [mode, changeMode] = usePlayerMode();
  const {
    currentIndex,
    playList,
    lyric,
    playing,
    currentTime,
    likelist,
    sequenceList,
    account,
  } = useSelector((state: RootState) => {
    return {
      sequenceList: state.player.sequenceList,
      currentIndex: state.player.currentIndex,
      playList: state.player.playList,
      lyric: state.player.lyric,
      playing: state.player.playing,
      currentTime: state.player.currentTime,
      likelist: state.playlist.mine.likelistIds,
      account: state.auth.account,
    };
  }, shallowEqual);
  const currentSong = useMemo(() => {
    return playList[currentIndex] || {};
  }, [currentIndex, playList]);
  const isliked = useMemo(() => {
    return likelist.indexOf(currentSong.id) !== -1;
  }, [currentSong.id, likelist]);
  const toggleLike = useCallback(
    (liked: boolean) => {
      dispatch(toggleLikeSong(currentSong.id, liked));
    },
    [currentSong.id, dispatch]
  );
  const currentLyric = useMemo(() => {
    if (lyric.data.lrc) {
      const item = lyric.data.lrc[lyric.currentIndex];
      return item.value;
    }
    return "";
  }, [lyric]);
  const getLyric = useCallback(() => {
    dispatch(fetchLyric(currentSong.id));
  }, [currentSong.id, dispatch]);
  const setPlaying = useCallback(
    (playing: boolean) => {
      dispatch(setPlayState(playing));
    },
    [dispatch]
  );
  const percent = useMemo(() => {
    return currentTime / currentSong.dt;
  }, [currentSong.dt, currentTime]);
  const [cachePercent, setCachePercent] = useState(0);
  const onUpdateTime = useCallback(() => {
    const element = audio.current;
    if (element) {
      dispatch(updateTime(element.currentTime * 1000));
      if (element.buffered.length) {
        const cacheTime = element.buffered.end(element.buffered.length - 1);
        setCachePercent((cacheTime * 10000) / (element.duration * 10000));
      } else {
        setCachePercent(0);
      }
    }
  }, [dispatch]);
  const setTime = (t: number) => {
    const element = audio.current;
    if (element) {
      element.currentTime = t;
    }
  };

  const onPercentChange = useCallback(
    (value: number) => {
      const t = currentSong.dt * value;
      setTime(t / 1000);
      dispatch(updateTime(t));
    },
    [currentSong.dt, dispatch]
  );
  const pause = () => {
    const element = audio.current;
    element && element.pause();
  };
  const onPause = () => setPlaying(false);
  const onPlay = () => {
    setPlaying(true);
    // dispatch(setHistory(currentSong))
  };
  function onError() {
    toast("播放失败");
    pause();
    setTime(0);
  }
  const play = useCallback(async () => {
    const el = audio.current;
    if (currentSong.id && el) {
      const playPromise = el.play();
      if (playPromise) {
        playPromise
          .then((res) => {
            console.log(res);
          })
          .catch(async (e) => {
            // 音频加载失败
            if (currentSong.fee === 1 && !account?.paidFee) {
              toast("开通 vip 畅听");
              return pause();
            }
            try {
              await checkSong(currentSong.id);
            } catch (err) {
              toast("亲爱的,暂无版权");
              return pause();
            }
            toast("播放失败");
          });
      }
    }
  }, [account?.paidFee, currentSong.fee, currentSong.id]);
  const togglePlay = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  const next = useCallback(() => {
    setTime(0);
    dispatch(playNext());
  }, [dispatch]);
  const prev = useCallback(() => {
    setTime(0);
    dispatch(playPrev());
  }, [dispatch]);
  const loop = () => {
    setTime(0);
    play();
  };
  const onEnd = () => {
    if (mode.val === PlayMode.loop) {
      loop();
    } else {
      next();
    }
  };
  const setCurrentSong = useCallback(
    (song: Track) => {
      dispatch(playSong(song));
    },
    [dispatch]
  );
  const removeSong = useCallback(
    (song: Track) => {
      dispatch(deleteSong(song));
    },
    [dispatch]
  );
  const clearList = useCallback(() => {
    dispatch(clear());
  }, [dispatch]);
  useEffect(() => {
    const element = audio.current;
    if (element && currentSong.id) {
      element.src = getSource(currentSong.id);
      getLyric();
      play();
    }
  }, [currentSong.id, getLyric, play]);
  return {
    currentSong,
    setCurrentSong,
    currentLyric,
    playList,
    sequenceList,
    playing,
    togglePlay,
    cachePercent,
    percent,
    currentTime,
    onUpdateTime,
    onPercentChange,
    audio,
    pause,
    play,
    mode,
    changeMode,
    next,
    prev,
    onPause,
    onEnd,
    onError,
    onPlay,
    lyric,
    isliked,
    toggleLike,
    removeSong,
    clearList,
  };
}
export const useCurrentSong = () => {
  const { currentIndex, playList } = useSelector((state: RootState) => {
    return {
      currentIndex: state.player.currentIndex,
      playList: state.player.playList,
      sequenceList: state.player.sequenceList,
    };
  }, shallowEqual);
  const currentSong = useMemo(() => {
    return playList[currentIndex] || {};
  }, [currentIndex, playList]);
  return currentSong;
};
export function usePlayMusic() {
  const currentSong = useCurrentSong();
  const dispatch = useDispatch();
  const selectPlayList = useCallback(
    (list: Track[], index: number) => {
      dispatch(selectPlay(list, index));
    },
    [dispatch]
  );
  const insertSingle = useCallback(
    (track: Track) => {
      dispatch(insertSong(track));
    },
    [dispatch]
  );
  return {
    currentSong,
    insertSong: insertSingle,
    selectPlay: selectPlayList,
  };
}
