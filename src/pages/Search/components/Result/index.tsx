import React from "react";
import "./style.scss";
import { SearchTypeVal } from "src/types";
import ArtistList from "../ArtistList";
import TrackList from "../TrackList";
import PlaylistList from "../PlaylistList";
import UserList from "../UserList";
interface Props {
  type: SearchTypeVal;
  query: string;
  active: boolean;
}
const SearchResult: React.FC<Props> = ({ type, query, active }) => {
  const props = { query, active };
  if (type === SearchTypeVal.artist) return <ArtistList {...props} />;
  else if (type === SearchTypeVal.user) {
    return <UserList {...props} />;
  } else if (type === SearchTypeVal.playlist) {
    return <PlaylistList {...props} />;
  } else {
    return <TrackList {...props} />;
  }
};
export default SearchResult;
