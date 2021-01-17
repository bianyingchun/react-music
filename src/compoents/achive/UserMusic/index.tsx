import React from "react";
import "./style.scss";
import MixItem from "../TinyMixItem";
import { Playlist } from "src/types";
interface Props {
  created: Playlist[];
  faved: Playlist[];
  likelist?: Playlist;
}
const UserMusic: React.FC<Props> = ({ created, faved, likelist }) => {
  return (
    <div className="user-music">
      <div className="module-container">
        <div className="module-header">
          <h3 className="title">音乐品味</h3>
        </div>
        {!!likelist && (
          <div className="likelist">
            <MixItem mix={likelist}></MixItem>
          </div>
        )}
      </div>

      {!!created && (
        <div className="module-container mix-list-container">
          <div className="module-header">
            <h3 className="title">创建歌单</h3>
            <span className="sub-text"> ({created.length}个)</span>
          </div>
          <div className="mix-list">
            {created.map((item) => (
              <MixItem key={item.id} mix={item}></MixItem>
            ))}
          </div>
        </div>
      )}
      {!!faved && (
        <div className="module-container mix-list-container">
          <div className="module-header">
            <h3 className="title">收藏歌单</h3>
            <span className="sub-text"> ({faved.length}个)</span>
          </div>
          <div className="mix-list">
            {faved.map((item) => (
              <MixItem key={item.id} mix={item}></MixItem>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(UserMusic);
