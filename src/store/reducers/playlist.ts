import * as Types from "../types/playlist";
const initialState: Types.PlaylistState = {
  list: [],
  hqTags: [],
  catlist: [],
  detail: null,
  mine: {
    created: [],
    faved: [],
    likelist: null,
    likelistIds: [],
  },
  loading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialState,
  action: Types.PlaylistActionTypes
): Types.PlaylistState => {
  switch (action.type) {
    case Types.SET_PLAYLIST_CATLIST: {
      return { ...state, catlist: action.payload };
    }
    case Types.SET_HQ_TAGLIST:
      return { ...state, hqTags: action.payload };
    case Types.SET_PLAYLIST_DETAIL:
      return { ...state, detail: action.payload };
    case Types.SET_CREATED_PLAYLIST:
      return { ...state, mine: { ...state.mine, created: action.payload } };
    case Types.SET_FAVED_PLAYLIST:
      return { ...state, mine: { ...state.mine, faved: action.payload } };
    case Types.SET_USER_LIKELIST:
      return { ...state, mine: { ...state.mine, likelist: action.payload } };
    case Types.SET_USER_LIKELISTIDS:
      return { ...state, mine: { ...state.mine, likelistIds: action.payload } };
    default:
      return state;
  }
};
