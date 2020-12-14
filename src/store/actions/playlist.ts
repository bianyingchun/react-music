import { RootState } from "src/store";
import { Playlist2 } from "src/types";
import { Dispatch } from "redux";
import { getPlaylistDetail } from "src/common/api/playlist";
import { PlaylistActionTypes, SET_PLAYLIST_DETAIL } from "../types";
export const fetchDetail = (id: number) => async (
  dispatch: Dispatch<PlaylistActionTypes>,
  getState: () => RootState
) => {
  try {
    const res = await getPlaylistDetail(id);
    dispatch({
      type: SET_PLAYLIST_DETAIL,
      payload: res.data.playlist,
    });
  } catch (err) {
    console.log(err);
  } finally {
  }
};

// export const toggleSubscribe = (
//   playlist: Playlist2,
//   subscribed: boolean
// ) => async (dispatch: Dispatch<PlaylistActionTypes>, getState: () => RootState) => {
//   try {
//     const pid = playlist.id;
//   } catch (err) {
//     const;
//   }
// };
