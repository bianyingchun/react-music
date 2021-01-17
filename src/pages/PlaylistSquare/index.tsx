import React, { useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Page from "src/compoents/achive/PageLayout";
import MixList from "./components/List";
import HqTagFilter from "./components/HqTagFilter";
const navList = [
  { name: "推荐" },
  { name: "官方" },
  { name: "精品" },
  { name: "流行" },
  { name: "轻音乐" },
  { name: "电子" },
  { name: "韩语" },
];
const DiscoveryPlaylist = () => {
  const [navIndex, setNavIndex] = useState(0);
  const [showHqFilter, setShowHqFilter] = useState(false);
  const [hqTag, setHqTag] = useState("全部");
  const [swiper, setSwiper] = useState<any>(null);
  function onSlideChange(swiper: any) {
    setNavIndex(swiper.activeIndex);
  }
  function toggleTab(index: number) {
    setNavIndex(index);
    swiper.slideTo(index, 0, false);
  }
  return (
    <>
      <Page
        title="歌单广场"
        navbar={
          <div className="nav-container ">
            <div className="nav-list">
              {navList.map((item, index) => (
                <div
                  className={
                    index === navIndex ? "nav-item active" : "nav-item"
                  }
                  key={index}
                  onClick={() => toggleTab(index)}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="more-btn">more</div>
          </div>
        }
        main={
          <Swiper
            className="playlist-square-content"
            onSwiper={setSwiper}
            onSlideChange={onSlideChange}
          >
            {navList.map((item, index) => (
              <SwiperSlide key={index}>
                <MixList
                  key={index}
                  name={item.name}
                  tag={hqTag}
                  onShowHq={() => setShowHqFilter(true)}
                ></MixList>
              </SwiperSlide>
            ))}
          </Swiper>
        }
      ></Page>
      <HqTagFilter
        show={showHqFilter}
        onHide={() => setShowHqFilter(false)}
        currentTag={hqTag}
        onSelectTag={setHqTag}
      ></HqTagFilter>
    </>
  );
};

export default DiscoveryPlaylist;
