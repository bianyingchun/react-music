import React, { useEffect, useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import ProfilePage from "src/compoents/achive/ProfilePage";
import TopMusic from "./components/TopMusic";
import ArtistProfile from "./components/ArtistProfile";
import { useNavSwiper } from "src/hooks/useNavSwiper";
import { getArtistProfile, followArtist } from "src/common/api/artist";
import { getUserDetail, getUserPlaylist } from "src/common/api/user";
import { toast } from "src/compoents/widgets/Toast";
import { useRouteParamId } from "src/hooks/usePage";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const id = useRouteParamId();
  const { NavList, onSlideChange, setSwiper } = useNavSwiper([
    { name: "主页" },
    { name: "热门歌曲" },
  ]);
  const [state, setState] = useState<any>({
    more: false,
    hotSongs: [],
    artist: null,
    userDetail: null,
    playlist: null,
  });
  async function onToggleFollow(followed: boolean) {
    if (!state.artist) return;
    try {
      const res = await followArtist(id, followed);
      if (res.data.code === 200) {
        const artist = state.artist;
        setState({
          ...state,
          artist: artist ? { ...artist, followed } : null,
        });
      } else {
        toast("关注失败");
      }
    } catch (err) {
      toast("关注失败");
    }
  }
  useEffect(() => {
    async function init() {
      const res = await getArtistProfile(id);
      const { more, hotSongs, artist } = res.data;
      const initialState: any = { more, hotSongs, artist };
      const aid = res.data.artist.accountId;
      if (aid) {
        const resArr = await Promise.all([
          getUserDetail(aid),
          getUserPlaylist(aid),
        ]);
        initialState.userDetail = resArr[0].data;
        initialState.playlist = resArr[1];
      }
      setState(initialState);
    }
    console.log(id);
    if (id) {
      init();
    }
  }, [id]);

  return (
    <ProfilePage
      userInfo={state.userDetail}
      artist={state.artist}
      navbar={NavList}
      onToggleFollow={onToggleFollow}
      main={
        <Swiper
          onSlideChange={onSlideChange}
          onSwiper={setSwiper}
          className="artist-content"
        >
          <SwiperSlide key="detail">
            <ArtistProfile
              userInfo={state.userDetail}
              artist={state.artist}
              playlist={state.playlist}
            ></ArtistProfile>
          </SwiperSlide>
          <SwiperSlide key="music">
            <TopMusic
              list={state.hotSongs}
              artistId={id}
              more={state.more}
            ></TopMusic>
          </SwiperSlide>
        </Swiper>
      }
    ></ProfilePage>
  );
};
