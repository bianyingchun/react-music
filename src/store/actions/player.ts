import { SET_LYRIC_INDEX } from "./../types/player";
import { RootState } from "src/store";
import { shuffle } from "lodash";
import { Dispatch } from "redux";
import { Track, PlayMode, ParsedLyricData } from "../../types";
import { PLAY_MODE_LIST } from "src/common/js/config";
import { getLyric } from "src/common/api/song";
import {
  PlayerActionTypes,
  SET_PLAYING_STATE,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_CURRENT_INDEX,
  SET_LYRIC_FETCHING,
  SET_SEQUENCE_LIST,
  SET_LYRIC_DATA,
  SET_CURRENT_TIME,
  SET_PLAY_HISTORY,
} from "../types/player";

export const setPlayState = (payload: boolean): PlayerActionTypes => ({
  type: SET_PLAYING_STATE,
  payload,
});

export const setPlayList = (payload: Track[]): PlayerActionTypes => ({
  type: SET_PLAYLIST,
  payload,
});

export const setPlayMode = (payload: PlayMode): PlayerActionTypes => ({
  type: SET_PLAY_MODE,
  payload,
});

export const setCurrentIndex = (payload: number): PlayerActionTypes => ({
  type: SET_CURRENT_INDEX,
  payload,
});

export const setLyrciData = (payload: ParsedLyricData): PlayerActionTypes => ({
  type: SET_LYRIC_DATA,
  payload,
});

export const setSequenceList = (payload: Track[]): PlayerActionTypes => ({
  type: SET_SEQUENCE_LIST,
  payload,
});

export const setLyricFetching = (payload: boolean): PlayerActionTypes => ({
  type: SET_LYRIC_FETCHING,
  payload,
});
export const setLyricIndex = (payload: number): PlayerActionTypes => ({
  type: SET_LYRIC_INDEX,
  payload,
});
export const setCurrentTime = (payload: number): PlayerActionTypes => ({
  type: SET_CURRENT_TIME,
  payload,
});

export const fetchLyric = (id: number) => async (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  try {
    if (getState().player.lyric.fetching) {
      return;
    }
    dispatch(setLyricFetching(true));
    const res = await getLyric(id);
    dispatch(setLyrciData(res));
    dispatch(setLyricIndex(0));
  } catch (err) {
    // todo dispatch err
    console.log("get lyric failed", err);
  } finally {
    dispatch(setLyricFetching(false));
  }
};
const findIndex = (list: Track[], song: Track) =>
  list.findIndex((item) => item.id === song.id);

export const selectPlay = (list: Track[], index: number) => (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  dispatch(setSequenceList(list));
  if (getState().player.mode === PlayMode.random) {
    const randomList = shuffle(list);
    dispatch(setPlayList(randomList));
    index = findIndex(randomList, list[index]);
  } else {
    dispatch(setPlayList(list));
  }
  dispatch(setCurrentIndex(index));
  dispatch(setPlayState(true));
};

export const randomPlay = (list: Track[]) => (
  dispatch: Dispatch<PlayerActionTypes>
) => {
  dispatch(setPlayMode(PlayMode.random));
  dispatch(setSequenceList(list));
  const randomList = shuffle(list);
  dispatch(setPlayList(randomList));
  dispatch(setCurrentIndex(0));
  dispatch(setPlayState(true));
};

export const insertSong = (song: Track) => (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  let { playList, sequenceList, currentIndex } = getState().player;
  playList = playList.slice();
  sequenceList = sequenceList.slice();
  // 记录当前歌曲
  const currentSong = playList[currentIndex];
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  const fpIndex = findIndex(playList, song);
  // 因为是插入歌曲，所以索引+1
  currentIndex++;
  // 插入这首歌到当前索引位置
  playList.splice(currentIndex, 0, song);
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playList.splice(fpIndex + 1, 1);
    }
  }
  const currentSIndex = findIndex(sequenceList, currentSong) + 1;
  const fsIndex = findIndex(sequenceList, song);
  sequenceList.splice(currentSIndex, 0, song);
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }
  dispatch(setPlayList(playList));
  dispatch(setSequenceList(sequenceList));
  dispatch(setCurrentIndex(currentIndex));
  dispatch(setPlayState(true));
};

export const deleteSong = (song: Track) => (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  let { playList, sequenceList, currentIndex } = getState().player;
  playList = playList.slice();
  sequenceList = sequenceList.slice();
  const pIndex = findIndex(playList, song);
  playList.splice(pIndex, 1);
  const sIndex = findIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--;
  }
  dispatch(setPlayList(playList));
  dispatch(setSequenceList(sequenceList));
  dispatch(setCurrentIndex(currentIndex));
  dispatch(setPlayState(!!playList.length));
};

export const playSong = (song: Track) => (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  const index = getState().player.playList.findIndex(
    (item) => item.id === song.id
  );
  dispatch(setCurrentIndex(index));
};

export const clear = () => (dispatch: Dispatch<PlayerActionTypes>) => {
  dispatch(setPlayList([]));
  dispatch(setSequenceList([]));
};
export const playNext = () => (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  const { playList, currentIndex } = getState().player;
  let index = currentIndex + 1;
  index = index === playList.length ? 0 : index;
  dispatch(setCurrentIndex(index));
};

export const playPrev = () => (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  const { playList, currentIndex } = getState().player;
  let index = currentIndex - 1;
  index = index < 0 ? playList.length - 1 : index;
  dispatch(setCurrentIndex(index));
};

export const updateTime = (time: number) => (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  dispatch(setCurrentTime(time));
  const state = getState().player;
  if (state.lyric.data.lrc) {
    for (let i = 0; i < state.lyric.data.lrc.length; i++) {
      const item = state.lyric.data.lrc[i];
      if (item.time * 1000 >= time) {
        dispatch(setLyricIndex(Math.max(0, i - 1)));
        break;
      }
    }
  }
};

export const togglePlayMode = () => (
  dispatch: Dispatch<PlayerActionTypes>,
  getState: () => RootState
) => {
  const state = getState().player;
  const mode = (state.mode + 1) % PLAY_MODE_LIST.length;
  if (mode === PlayMode.random) {
    const randomList = shuffle(state.playList);
    dispatch(setPlayList(randomList));
  }
  dispatch(setPlayMode(mode));
};
