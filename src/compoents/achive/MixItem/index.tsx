import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { formatNumber } from "src/common/js/util";
import { Mix } from "src/types";
import "./style.scss";
interface Props {
  mix: Mix;
  isToplist?: Boolean;
}
const MixItem: React.FC<Props> = ({ mix, isToplist }) => {
  return (
    <Link to={"/playlist/" + mix.id} className="mix-item item">
      <div className="cover">
        {/* <LazyLoad height="100px" overflow={true}> */}
        <img src={mix.coverImgUrl} alt="" />
        {/* </LazyLoad> */}
        {isToplist ? (
          <span className="desc">{mix.updateFrequency}</span>
        ) : (
          <span className="play-count">
            <i className="iconfont icon-play"></i>
            {formatNumber(mix.playCount)}
          </span>
        )}
      </div>
      <div className="text">{mix.name}</div>
    </Link>
  );
};

export default MixItem;
