import { RootState } from "src/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Playlist2 } from "src/types";

export function usePlaylist() {
  const account = useSelector((store: RootState) => store.auth.account);
  const checkIsSelf = (playlist: Playlist2) => {
    return (
      account && playlist.creator && playlist.creator.userId === account.id
    );
  };

  const dispatch = useDispatch();
  const toggleSubscribe = useCallback(async (playlist: Playlist2) => {
    if (playlist.subscribed) {
      dispatch({});
    } else {
    }
  }, []);
  return {
    checkIsSelf,
  };
}
