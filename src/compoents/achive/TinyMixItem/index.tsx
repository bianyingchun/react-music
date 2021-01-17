import React from "react";
import "./style.scss";
import { Playlist, Playlist3 } from "src/types";
import { useHistory } from "react-router-dom";
interface Props {
  mix: Playlist | Playlist3;
  onSelect?: (mix: Playlist | Playlist3) => void;
}
const TinyMixItem: React.FC<Props> = ({ mix, onSelect, children }) => {
  const history = useHistory();
  function onClick() {
    if (onSelect) {
      onSelect(mix);
    } else {
      history.push("/playlist/" + mix.id);
    }
  }
  return (
    <div className="tiny-mix-item" onClick={onClick}>
      <img src={mix.coverImgUrl} alt="" className="mix-cover" />
      <div className="mix-text">
        <div className="name">{mix.name}</div>
        <div className="desc">{mix.trackCount}首歌曲</div>
      </div>
      <div className="tools" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default TinyMixItem;
