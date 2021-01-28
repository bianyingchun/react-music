import { SET_HQ_TAGLIST } from "./../constant";
import { RootState } from "src/store";
import { Playlist2, Playlist, Track } from "src/types";
import { Dispatch } from "redux";
import { toast } from "src/compoents/widgets/Toast";
import { setLoginVisible } from "./auth";
import {
  getPlaylistDetail,
  getCatlist,
  getHqTaglist,
  subscribePlaylist,
  updatePlaylistTracks,
  deletePlaylist,
  createPlaylist,
} from "src/common/api/playlist";
import { likeSong } from "src/common/api/song";
import {
  PlaylistActionTypes,
  SET_PLAYLIST_DETAIL,
  SET_USER_LIKELIST,
  SET_USER_LIKELISTIDS,
  SET_CREATED_PLAYLIST,
  SET_FAVED_PLAYLIST,
  SET_PLAYLIST_CATLIST,
  SET_PLAYLIST_POSTING,
  CLEAR_USER_PLAYLIST,
} from "../types/playlist";
import { getUserPlaylist, getlikelistIds } from "src/common/api/user";

export const setUserLikelist = (payload: Playlist): PlaylistActionTypes => ({
  type: SET_USER_LIKELIST,
  payload,
});

export const setUserLikelistIds = (payload: number[]): PlaylistActionTypes => ({
  type: SET_USER_LIKELISTIDS,
  payload,
});
export const setPlaylistPosting = (payload: boolean): PlaylistActionTypes => ({
  type: SET_PLAYLIST_POSTING,
  payload,
});
export const setCreatedPlaylist = (
  payload: Playlist[]
): PlaylistActionTypes => ({
  type: SET_CREATED_PLAYLIST,
  payload,
});

export const setFavedPlaylist = (payload: Playlist[]): PlaylistActionTypes => ({
  type: SET_FAVED_PLAYLIST,
  payload,
});

export const setPlaylistDetail = (payload: Playlist2): PlaylistActionTypes => ({
  type: SET_PLAYLIST_DETAIL,
  payload,
});
export const fetchDetail = (id: number) => async (
  dispatch: Dispatch<PlaylistActionTypes>
) => {
  try {
    const res = await getPlaylistDetail(id);
    dispatch(setPlaylistDetail(res.data.playlist));
  } catch (err) {
    console.log(err);
  } finally {
  }
};

export const fetchMyPlaylist = () => async (
  dispatch: Dispatch<PlaylistActionTypes>,
  getState: () => RootState
) => {
  const account = getState().auth.account;
  if (!account) return;
  const res = await Promise.all([
    getUserPlaylist(account.id),
    getlikelistIds(account.id),
  ]);
  const { created, faved, likelist } = res[0];
  dispatch(setCreatedPlaylist(created));
  dispatch(setFavedPlaylist(faved));
  dispatch(setUserLikelist(likelist));
  dispatch(setUserLikelistIds(res[1]));
};

export const setPlaylistCatlist = () => async (
  dispatch: Dispatch<PlaylistActionTypes>
) => {
  try {
    const list = await getCatlist();
    dispatch({
      type: SET_PLAYLIST_CATLIST,
      payload: list,
    });
  } catch (err) {
    toast("请求失败");
  }
};

export const fetchHqTaglist = () => async (
  dispatch: Dispatch<PlaylistActionTypes>
) => {
  try {
    const res = await getHqTaglist();
    dispatch({
      type: SET_HQ_TAGLIST,
      payload: res.data.tags,
    });
  } catch (err) {
    toast("请求失败");
  }
};

export const toggleSubscribe = (
  playlist: Playlist,
  subscribed: boolean
) => async (
  dispatch: Dispatch<PlaylistActionTypes>,
  getState: () => RootState
) => {
  try {
    const state = getState().playlist;
    if (state.posting) return;
    dispatch(setPlaylistPosting(true));
    const pid = playlist.id;
    await subscribePlaylist(pid, !subscribed);
    if (state.detail && state.detail.id === pid) {
      dispatch(
        setPlaylistDetail({
          ...state.detail,
          subscribed,
        })
      );
    }
    const list = state.mine.faved.slice();
    if (subscribed) {
      list.unshift({ ...playlist, subscribed });
    }
    const index = list.findIndex((item) => item.id === pid);
    if (index !== -1) {
      list.splice(index, 1);
      dispatch(setFavedPlaylist(list));
    }
  } catch (err) {
    toast(subscribed ? "收藏失败" : "取消收藏失败");
  } finally {
    dispatch(setPlaylistPosting(false));
  }
};

export const deleteTrack = (pid: number, track: Track) => async (
  dispatch: Dispatch<PlaylistActionTypes>,
  getState: () => RootState
) => {
  let message = "";
  try {
    const state = getState().playlist;
    if (state.posting) return;
    dispatch(setPlaylistPosting(true));
    const res = await updatePlaylistTracks(pid, track.id, "del");
    if (res.data.body.code !== 200) {
      message = res.data.body.message;
    } else {
      if (state.detail && state.detail.id === pid) {
        const tracks = state.detail.tracks.slice();
        const index = tracks.findIndex((item) => item.id === track.id);
        tracks.splice(index, 1);
        dispatch(
          setPlaylistDetail({
            ...state.detail,
            tracks,
          })
        );
      }
      const list = state.mine.created.slice();
      const index = list.findIndex((item) => item.id === pid);
      if (index !== -1) {
        list[index].trackCount--;
        dispatch(setCreatedPlaylist(list));
      }
    }
  } catch (err) {
    message = "删除失败";
  } finally {
    dispatch(setPlaylistPosting(false));
    toast(message || "已从歌单中删除");
  }
};

export const addTrack = (pid: number, track: Track) => async (
  dispatch: Dispatch<PlaylistActionTypes>,
  getState: () => RootState
) => {
  let message = "";
  try {
    const state = getState().playlist;
    if (state.posting) return;
    dispatch(setPlaylistPosting(true));
    const res = await updatePlaylistTracks(pid, track.id, "add");
    if (res.data.body.code !== 200) {
      message = res.data.body.message;
    } else {
      if (state.detail && state.detail.id === pid) {
        const tracks = [track, ...state.detail.tracks];
        dispatch(
          setPlaylistDetail({
            ...state.detail,
            tracks,
          })
        );
      }
      const list = state.mine.created.slice();
      const index = list.findIndex((item) => item.id === pid);
      if (index !== -1) {
        list[index].trackCount++;
        dispatch(setCreatedPlaylist(list));
      }
    }
  } catch (err) {
    message = "添加失败";
  } finally {
    dispatch(setPlaylistPosting(false));
    toast(message || "已添加到到歌单");
  }
};

export const deleteCreated = (pid: number) => async (
  dispatch: Dispatch<PlaylistActionTypes>,
  getState: () => RootState
) => {
  let message = "";
  try {
    const state = getState().playlist;
    if (state.posting) return;
    dispatch(setPlaylistPosting(true));
    const res = await deletePlaylist(pid);
    if (res.data.code === 200) {
      const list = state.mine.created.slice();
      const index = list.findIndex((item) => item.id === pid);
      if (index !== -1) {
        list.splice(index, 1);
        dispatch(setCreatedPlaylist(list));
      }
    } else {
      message = res.data.message || "删除失败";
    }
  } catch (err) {
    message = "删除失败";
  } finally {
    dispatch(setPlaylistPosting(false));
    toast(message || "已删除歌单");
  }
};

export const addPlaylist = (name: string, privacy: boolean) => async (
  dispatch: Dispatch<PlaylistActionTypes>,
  getState: () => RootState
) => {
  try {
    const state = getState().playlist;
    if (state.posting) return;
    dispatch(setPlaylistPosting(true));
    const created = state.mine.created;
    const res = await createPlaylist({ name, privacy });
    if (res.data.playlist) {
      dispatch(setCreatedPlaylist([res.data.playlist, ...created]));
    } else {
      toast("创建失败");
    }
  } catch (err) {
    toast("创建失败");
  } finally {
    dispatch(setPlaylistPosting(false));
  }
};

export const toggleLikeSong = (id: number, like: boolean) => async (
  dispatch: Dispatch<any>,
  getState: () => RootState
) => {
  const state = getState();
  if (!state.auth.account) {
    return dispatch(setLoginVisible(true));
  }
  if (state.playlist.posting) return;
  dispatch(setPlaylistPosting(true));
  try {
    const res = await likeSong(id, like);
    if (res.data.code === 200) {
      if (like) {
        dispatch(setUserLikelistIds([...state.playlist.mine.likelistIds, id]));
      } else {
        const list = state.playlist.mine.likelistIds.slice();
        const index = list.indexOf(id);
        list.splice(index, 1);
        dispatch(setUserLikelistIds(list));
      }
    }
  } catch (err) {
    toast("请求失败");
  } finally {
    dispatch(setPlaylistPosting(false));
  }
};

export const clearUserPlaylist = (): PlaylistActionTypes => ({
  type: CLEAR_USER_PLAYLIST,
});
