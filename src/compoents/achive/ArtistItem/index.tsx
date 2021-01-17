import React from "react";
import { Artist } from "src/types";
import "./style.scss";
import { Link } from "react-router-dom";
interface Props {
  artist: Artist;
}

const ArtistItem: React.FC<Props> = ({ artist }) => {
  return (
    <Link className="artist-item" key={artist.id} to={`/artist/${artist.id}`}>
      <img src={artist.picUrl} alt="" className="avatar" />
      <div className="name">{artist.name}</div>
      {artist.followed ? (
        <span className="follow-status">
          <i className="iconfont icon-selected"></i>
          已关注
        </span>
      ) : (
        <span className="follow-status unfollowed">
          <i className="iconfont icon-add"></i>关注
        </span>
      )}
    </Link>
  );
};

export default ArtistItem;
