import React, { useCallback, useEffect, useState, useRef } from "react";

import { search } from "src/common/api/search";
import { useLoadMore } from "src/hooks/useLoadMore";
import { SearchTrackResult, SearchTypeVal, Track } from "src/types";
import { toast } from "src/compoents/widgets/Toast";
import SongList from "src/compoents/achive/SongList";
import { transformTrack } from "src/common/js/music";
import { usePlayMusic } from "src/hooks/usePlayer";
import { getSongDetail } from "src/common/api/song";
// eslint-disable-next-line import/no-anonymous-default-export
interface Props {
  query: string;
  active: boolean;
}
const TrackList: React.FC<Props> = ({ query, active }) => {
  const [loading, setLoading] = useState(false);
  const hasMore = useRef(true);
  const [list, setList] = useState<Track[]>([]);
  const { currentSong, insertSong } = usePlayMusic();
  const getList = useCallback(async () => {
    try {
      if (!hasMore.current || loading) return;
      //   setLoading(true);
      const res = await search<SearchTrackResult>({
        type: SearchTypeVal.track,
        keywords: query,
      });
      hasMore.current = res.data.result.hasMore;
      const newList = res.data.result.songs.map((item) => transformTrack(item));
      setList((list) => [...list, ...newList]);
    } catch (err) {
      toast("加载失败");
    } finally {
      //   setLoading(false);
    }
  }, [loading, query]);
  const refreshElem = useRef<HTMLDivElement | null>(null);
  useLoadMore(refreshElem, getList);
  useEffect(() => {
    if (active && !list.length) {
      getList();
    }
  }, [active]);
  async function onSelect(list: Track[], index: number) {
    try {
      const res = await getSongDetail([list[index].id]);
      const track = res.data.songs[0];
      if (track) {
        insertSong(track);
      } else {
        throw new Error();
      }
    } catch (err) {
      toast("播放失败");
    }
  }

  return (
    <div className="result-list" ref={refreshElem}>
      <SongList
        list={list}
        onSelect={onSelect}
        currentItem={currentSong}
      ></SongList>
    </div>
  );
};

export default TrackList;
