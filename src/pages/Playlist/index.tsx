import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./style.scss";
import MixPage from "src/compoents/achive/MixPage";
import { fetchDetail } from "src/store/actions/playlist";
import { RootState } from "src/store";
import SongList from "src/compoents/achive/SongList";
const Player = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const playlist = useSelector((store: RootState) => store.playlist.detail);
  useEffect(() => {
    dispatch(fetchDetail(Number(params.id)));
  }, [dispatch, params.id]);

  return (
    <MixPage
      title="歌单列表"
      bgPic="http://p2.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150"
      header={<div>header</div>}
      main={playlist ? <SongList list={playlist?.tracks} /> : null}
    ></MixPage>
  );
};
export default Player;
