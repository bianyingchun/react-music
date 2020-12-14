import React, { useState, useRef, useMemo, useEffect } from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";
interface MainPageProps {
  title: String;
  bgPic: String;
  header: React.ReactNode;
  main: React.ReactNode;
}

const MixPage: React.FC<MainPageProps> = ({
  title,
  bgPic,
  children,
  header,
  main,
}) => {
  let navBarElm = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState(false);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const slogan = useMemo(() => {
    return titleOpacity > 0.3 ? title : "";
  }, [title, titleOpacity]);
  const [offsetTop, setOffsetTop] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  function onScroll() {
    // e.target;
    if (container.current) {
      const top = container.current.scrollTop;
      setFixed(top + 60 >= offsetTop);
      setTitleOpacity(Math.min(1, top / offsetTop));
    }
  }
  useEffect(() => {
    setOffsetTop(navBarElm.current?.offsetTop || 0);
  }, []);
  const history = useHistory();
  const back = () => {
    history.goBack();
  };
  return (
    <div className="mix-container" ref={container} onScroll={onScroll}>
      <div className="title-bar">
        <div className="bg" style={{ opacity: titleOpacity }}>
          <div
            className="cover"
            style={{ backgroundImage: `url(${bgPic})` }}
          ></div>
        </div>
        <span
          className="iconfont icon-back"
          onClick={() => {
            back();
          }}
        ></span>
        <span className="title">{slogan}</span>
      </div>
      <div className="mix-info">
        <div className="bg">
          <div
            className="cover"
            style={{ backgroundImage: `url(${bgPic})` }}
          ></div>
        </div>
        <div className="header">{header}</div>
        <div ref={navBarElm} className={fixed ? "navbar fixed" : "navbar"}>
          <div className="navbar-content">
            <i className="iconfont icon-play"></i>
            <span>播放全部</span>
          </div>
        </div>
      </div>
      <div className="main">{main}</div>
    </div>
  );
};
export default MixPage;
