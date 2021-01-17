import React from "react";
import { Ar } from "src/types";
import "./style.scss";
interface SongArProps {
  list: Ar[];
  onSelect: (ar: Ar) => void;
}
const SongAr: React.FC<SongArProps> = ({ list, onSelect }) => {
  return (
    <div className="artist-container">
      <h3 className="title">请选择要查看的歌手</h3>
      {list.map((item) => (
        <div
          className="artist-item"
          key={item.id}
          onClick={() => {
            onSelect(item);
          }}
        >
          <span className="text">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SongAr;
