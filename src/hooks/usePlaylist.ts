import { RootState } from "src/store";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Playlist2, Track, Playlist } from "src/types";
import {
  toggleSubscribe,
  addTrack,
  deleteTrack,
  deleteCreated,
  fetchDetail,
} from "src/store/actions/playlist";
import { confirm } from "src/compoents/widgets/Dialog";

export function usePlaylist() {
  const account = useSelector((store: RootState) => store.auth.account);
  const checkIsSelf = (playlist: Playlist2) => {
    return (
      account && playlist.creator && playlist.creator.userId === account.id
    );
  };
  const dispatch = useDispatch();
  const toggleSubscribePlaylist = useCallback(
    async (playlist: Playlist2 | Playlist) => {
      if (playlist.subscribed) {
        confirm("确定不再收藏此歌单吗").then(() => {
          dispatch(toggleSubscribe(playlist, false));
        });
      } else {
        dispatch(toggleSubscribe(playlist, true));
      }
    },
    [dispatch]
  );
  return {
    checkIsSelf,
    toggleSubscribePlaylist,
  };
}

export const useMyPlaylist = () => {
  const mine = useSelector((state: RootState) => state.playlist.mine);
  const dispatch = useDispatch();
  const addTrackToPlaylist = useCallback(
    (pid: number, track: Track) => {
      dispatch(addTrack(pid, track));
    },
    [dispatch]
  );
  const deleteTrackFromPlaylist = useCallback(
    (pid: number, track: Track) => {
      confirm("确定将所选音乐从列表中删除？").then(() => {
        dispatch(deleteTrack(pid, track));
      });
    },
    [dispatch]
  );
  const deletePlaylist = useCallback(
    (pid: number) => {
      confirm("确定删除歌单？").then(() => {
        dispatch(deleteCreated(pid));
      });
    },
    [dispatch]
  );

  return { mine, addTrackToPlaylist, deleteTrackFromPlaylist, deletePlaylist };
};

export function usePlaylistDetail(id: number) {
  const dispatch = useDispatch();
  const { checkIsSelf, toggleSubscribePlaylist } = usePlaylist();
  const playlist = useSelector((store: RootState) => store.playlist.detail);
  useEffect(() => {
    if (id && (!playlist || playlist.id !== id)) {
      dispatch(fetchDetail(id));
    }
  }, [dispatch, id]);
  const isMine = useMemo(() => (playlist ? checkIsSelf(playlist) : false), [
    checkIsSelf,
    playlist,
  ]);
  const toggleSubscribe = () => {
    !!playlist && toggleSubscribePlaylist(playlist);
  };
  const deleteTrackFromPlaylist = useCallback(
    (track: Track) => {
      confirm("确定将所选音乐从列表中删除？").then(() => {
        dispatch(deleteTrack(id, track));
      });
    },
    [dispatch, id]
  );
  return {
    playlist,
    isMine,
    toggleSubscribe,
    deleteTrackFromPlaylist,
  };
}
