import { Track } from "src/types";
import React from "react";
import SongAr from "src/compoents/achive/SongAr";
import { popupDialog } from "src/compoents/widgets/Dialog";
export function getSingerName(track: Track) {
  return track.ar.map((item: any) => item.name).join("/");
}

export function showSongAr(song: Track, history: any) {
  const ar = song.ar;
  if (ar.length === 1) {
    return history.push("/artist/" + ar[0].id);
  }
  popupDialog((close) => {
    return (
      <SongAr
        list={ar}
        onSelect={(item) => {
          close();
          history.push("/artist/" + item.id);
        }}
      ></SongAr>
    );
  });
}
