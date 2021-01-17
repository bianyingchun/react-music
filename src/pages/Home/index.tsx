import React from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Mine from "../Mine";
import Discovery from "../Discovery";
import { useNavSwiper } from "src/hooks/useNavSwiper";
import SiderBar from "./components/Siderbar";
const Home: React.FC = () => {
  const { NavList, setSwiper, onSlideChange } = useNavSwiper([
    { name: "发现" },
    { name: "我的" },
  ]);
  return (
    <div className="page-container home">
      <div className="home-navbar">
        <SiderBar />
        {NavList}
        <Link to="/search">
          <span className="iconfont icon-search"></span>
        </Link>
      </div>
      <div className="home-content">
        <Swiper onSwiper={setSwiper} onSlideChange={onSlideChange}>
          <SwiperSlide className="home-slide">
            <Discovery />
          </SwiperSlide>
          <SwiperSlide className="home-slide">
            <Mine />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
export default Home;
