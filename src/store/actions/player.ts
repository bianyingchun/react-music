// import { Dispatch } from "react";
import { Track, PlayMode, ParsedLyricData } from "../../types";
import {
  PlayerActionTypes,
  SET_PLAYING_STATE,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_CURRENT_INDEX,
  SET_LYRIC_FETCHING,
  SET_SEQUENCE_LIST,
  SET_LYRIC_DATA,
} from "../types/player";
export const setPlaying = (payload: boolean): PlayerActionTypes => ({
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

export const setSequenceLIst = (payload: Track[]): PlayerActionTypes => ({
  type: SET_SEQUENCE_LIST,
  payload,
});

export const setLyricFetching = (payload: boolean): PlayerActionTypes => ({
  type: SET_LYRIC_FETCHING,
  payload,
});
