import { PlayMode, Track, ParsedLyricData } from "../../types";

export const SET_SEQUENCE_LIST = "SET_SEQUENCE_LIST";
export const SET_PLAY_MODE = "SET_PLAY_MODE";
export const SET_CURRENT_INDEX = "SET_CURRENT_INDEX";
export const SET_PLAY_HISTORY = "SET_PLAY_HISTORY";
export const SET_LYRIC_DATA = "SET_LYRIC_DATA";
export const SET_LYRIC_FETCHING = "SET_LYRIC_FETCHING";
export const SET_CURRENT_TIME = "SET_CURRENT_TIME";
export const SET_LYRIC_INDEX = "SET_LYRIC_INDEX";
export const SET_PLAYLIST = "SET_PLAYLIST";
export const SET_PLAYING_STATE = "SET_PLAYING_STATE";

interface SetCurrentIndex {
  type: typeof SET_CURRENT_INDEX;
  payload: number;
}

interface SetPlayMode {
  type: typeof SET_PLAY_MODE;
  payload: PlayMode;
}

interface SetPlayList {
  type: typeof SET_PLAYLIST;
  payload: Track[];
}

interface SetLyricIndex {
  type: typeof SET_LYRIC_INDEX;
  payload: number;
}

interface SetCurrentTime {
  type: typeof SET_CURRENT_TIME;
  payload: number;
}

interface SetPlaying {
  type: typeof SET_PLAYING_STATE;
  payload: boolean;
}

interface SetLyricData {
  type: typeof SET_LYRIC_DATA;
  payload: ParsedLyricData;
}

interface SetSequenceLIst {
  type: typeof SET_SEQUENCE_LIST;
  payload: Track[];
}

interface SetPlayHistory {
  type: typeof SET_PLAY_HISTORY;
  payload: Track[];
}

interface SetLyricFecthing {
  type: typeof SET_LYRIC_FETCHING;
  payload: boolean;
}
export type PlayerActionTypes =
  | SetCurrentIndex
  | SetPlayMode
  | SetPlayList
  | SetLyricIndex
  | SetCurrentTime
  | SetPlaying
  | SetLyricData
  | SetSequenceLIst
  | SetLyricFecthing
  | SetPlayHistory;

export interface PlayerState {
  playList: Track[];
  sequenceList: Track[];
  currentIndex: number;
  mode: PlayMode;
  playing: boolean;
  playHistory: Track[];
  currentTime: number;
  lyric: {
    data: ParsedLyricData;
    currentIndex: number;
    fetching: boolean;
  };
}
