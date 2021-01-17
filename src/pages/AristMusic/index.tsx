import React, { useState, useRef, useEffect } from "react";
import Page from "src/compoents/achive/PageLayout";
import SongList from "src/compoents/achive/SongList";
import { getSongList } from "src/common/api/artist";
import { Track } from "src/types";
import { useLoadMore, usePage } from "src/hooks/useLoadMore";
import { usePlayMusic } from "src/hooks/usePlayer";
import { useRouteParamId } from "src/hooks/usePage";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const aid = useRouteParamId();
  const [order] = useState<"hot" | "time">("hot");
  const [list, setList] = useState<Track[]>([]);
  const refreshElm = useRef<HTMLDivElement | null>(null);
  const { currentSong, selectPlay } = usePlayMusic();
  const { loading, getList, refresh } = usePage(
    async (limit: number, offset: number) => {
      const res = await getSongList(aid, {
        order: order,
        limit,
        offset,
      });
      setList((list) => [...list, ...res.data.songs]);
      return res.data.more;
    }
  );

  useLoadMore(refreshElm, getList);
  useEffect(() => {
    if (aid) {
      refresh();
      setList([]);
      getList();
    }
  }, [aid]);
  return (
    <Page
      title="全部歌曲"
      main={
        <div className="scroller-container" ref={refreshElm}>
          <SongList
            list={list}
            rank={true}
            onSelect={selectPlay}
            currentItem={currentSong}
          />
          {loading && <div>loading</div>}
        </div>
      }
    ></Page>
  );
};
