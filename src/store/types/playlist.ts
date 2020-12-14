import { CategoryList, Tag, Playlist2, Playlist } from "src/types";
export const SET_PLAYLIST_CATLIST = "SET_PLAYLIST_CATLIST";
export const SET_HQ_TAGLIST = "SET_HQ_TAGLIST";
export const SET_CONFIG_THEME = "SET_CONFIG_THEME";

export const SET_PLAYLIST_DETAIL = "SET_PLAYLIST_DETAIL";
export const SET_PLAYLIST_LOADING = "SET_PLAYLIST_LOADING";

export const SET_CREATED_PLAYLIST = "SET_CREATED_PLAYLIST";
export const SET_FAVED_PLAYLIST = "SET_FAVED_PLAYLIST";
export const SET_USER_LIKELIST = "SET_USER_LIKELIST";
export const SET_USER_LIKELISTIDS = "SET_USER_LIKELISTIDS";

export const SET_POSTING = "SET_POSTING";
export const SET_FETCHING = "SET_FETCHING";

interface SetPlaylistCatlist {
  type: typeof SET_PLAYLIST_CATLIST;
  payload: CategoryList[];
}
interface SetHqTaglist {
  type: typeof SET_HQ_TAGLIST;
  payload: Tag[];
}

interface SetPlaylistDetail {
  type: typeof SET_PLAYLIST_DETAIL;
  payload: Playlist2;
}

interface SetCreatedPlaylist {
  type: typeof SET_CREATED_PLAYLIST;
  payload: Playlist[];
}
interface SetFavedPlaylist {
  type: typeof SET_FAVED_PLAYLIST;
  payload: Playlist[];
}
interface SetUserLikelist {
  type: typeof SET_USER_LIKELIST;
  payload: Playlist;
}

interface SetUserLikelistIds {
  type: typeof SET_USER_LIKELISTIDS;
  payload: number[];
}

export type PlaylistActionTypes =
  | SetUserLikelistIds
  | SetUserLikelist
  | SetCreatedPlaylist
  | SetPlaylistDetail
  | SetHqTaglist
  | SetPlaylistCatlist
  | SetFavedPlaylist;

export interface PlaylistState {
  loading: boolean;
  list: Playlist[];
  hqTags: Tag[];
  catlist: CategoryList[];
  detail: Playlist2 | null;
  mine: {
    faved: Playlist[];
    created: Playlist[];
    likelist: Playlist | null;
    likelistIds: number[];
  };
}
