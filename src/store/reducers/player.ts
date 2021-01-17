import { PlayMode } from "../../types";
import * as Types from "../types/player";
const initialState: Types.PlayerState = {
  playList: [],
  sequenceList: [],
  currentIndex: -1,
  mode: PlayMode.sequence,
  playing: false,
  // playHistory: loadPlay()
  playHistory: [],
  currentTime: 0,
  lyric: {
    data: {},
    currentIndex: 0,
    fetching: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialState,
  action: Types.PlayerActionTypes
): Types.PlayerState => {
  switch (action.type) {
    case Types.SET_PLAYING_STATE:
      return { ...state, playing: action.payload };
    case Types.SET_PLAYLIST:
      return { ...state, playList: action.payload };
    case Types.SET_SEQUENCE_LIST:
      return { ...state, sequenceList: action.payload };
    case Types.SET_PLAY_MODE:
      return { ...state, mode: action.payload };
    case Types.SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };
    case Types.SET_PLAY_HISTORY:
      return { ...state, playHistory: action.payload };
    case Types.SET_LYRIC_DATA: {
      const lyric = { ...state.lyric, data: action.payload };
      return { ...state, lyric };
    }
    case Types.SET_LYRIC_FETCHING: {
      const lyric = { ...state.lyric, fetching: action.payload };
      return { ...state, lyric };
    }
    case Types.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case Types.SET_LYRIC_INDEX: {
      const lyric = { ...state.lyric, currentIndex: action.payload };
      return { ...state, lyric };
    }
    default: {
      return state;
    }
  }
};

// function findIndex(list: Track[], song: Track) {
//   return list.findIndex((item) => item.id === song.id);
// }
