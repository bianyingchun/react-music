import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import CustomSongs from "./components/CustomSongs";
import RcmdPlaylists from "./components/RcmdPlaylists";
import { HomePageData, Ball, Banner } from "src/types";
import {
  getHomePage,
  getHomeBallList,
  getBannerList,
} from "src/common/api/discovery";
import SwiperCore, { Scrollbar, Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Scrollbar, Autoplay, Pagination]);
const Discovery = () => {
  const [state, setState] = useState<{
    homeData: HomePageData;
    ballList: Ball[];
  }>({ homeData: {}, ballList: [] });
  useEffect(() => {
    async function getData() {
      const res = await Promise.all([getHomePage(), getHomeBallList()]);
      setState({
        homeData: res[0],
        ballList: res[1],
      });
    }
    getData();
  }, []);
  const [banners, setBanners] = useState<Banner[]>([]);
  useEffect(() => {
    async function getData() {
      const res = await getBannerList();
      if (res.data.code === 200) {
        setBanners(res.data.banners);
      }
    }
    getData();
  }, []);
  return (
    <div className="discovery">
      <div className="banner">
        <Swiper
          autoplay={true}
          loop={true}
          pagination={{ el: ".swiper-pagination", dynamicBullets: true }}
        >
          {banners.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="banner-item">
                <img src={item.pic} alt="" />
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
      <div className="block ball-list">
        {state.ballList.map((item, index) => (
          <Link to={item.url} key={index} className="ball-item">
            <div className="icon">
              <i className={"iconfont " + item.icon}></i>
            </div>
            <div className="text">{item.text}</div>
          </Link>
        ))}
      </div>
      <div className="block">
        <div className="block-header">
          <h3>{state.homeData.rcmdPlaylist?.title}</h3>
          <Link to="/playlist/square" className="block-btn">
            更多 <i className="iconfont icon-right"></i>
          </Link>
        </div>
        <RcmdPlaylists
          list={state.homeData.rcmdPlaylist?.data || []}
        ></RcmdPlaylists>
      </div>
      <div className="block">
        <div className="block-header">
          <h3>{state.homeData.customSonglist?.title || ""}</h3>
          <span className="block-btn">
            播放
            <i className="iconfont icon-play"></i>
          </span>
        </div>
        <CustomSongs
          creatives={state.homeData.customSonglist?.data || []}
        ></CustomSongs>
      </div>
      <div className="block">
        <div className="block-header">
          <h3>{state.homeData.officalPlaylist?.title || ""}</h3>
          <Link to="/playlist/square" className="block-btn">
            更多 <i className="iconfont icon-right"></i>
          </Link>
        </div>
        <RcmdPlaylists
          list={state.homeData.officalPlaylist?.data || []}
        ></RcmdPlaylists>
      </div>
    </div>
  );
};

export default Discovery;
