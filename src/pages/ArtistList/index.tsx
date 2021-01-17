import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import Page from "src/compoents/achive/PageLayout";
import { ARTIST_CATEGORY } from "src/common/js/config";
import { getArtistList } from "src/common/api/artist";
import { Artist } from "src/types";
import { usePage, useLoadMore } from "src/hooks/useLoadMore";
import ArtistItem from "src/compoents/achive/ArtistItem";
const defaultType = ARTIST_CATEGORY.type[0].val;
const defaultArea = ARTIST_CATEGORY.area[0].val;
const typeList = ARTIST_CATEGORY.type.slice(1);
const areaList = ARTIST_CATEGORY.area.slice(1);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [type, setType] = useState(defaultType);
  const [area, setArea] = useState(defaultArea);
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const onSetArea = (val: number) => {
    setArea(val);
    if (type === defaultType) {
      setType(ARTIST_CATEGORY.type[1].val);
    }
  };
  const onSetType = (val: number) => {
    setType(val);
    if (area === defaultArea) {
      setArea(ARTIST_CATEGORY.area[1].val);
    }
  };
  const refreshElm = useRef<HTMLDivElement | null>(null);
  const { loading, getList, refresh } = usePage(
    async (limit: number, offset: number) => {
      const res = await getArtistList({
        limit,
        offset,
        type,
        area,
      });
      setArtistList((list) => [...list, ...res.data.artists]);
      return res.data.more;
    }
  );
  useLoadMore(refreshElm, getList);
  useEffect(() => {
    setArtistList([]);
    refresh();
  }, [type, area]);
  return (
    <Page
      title="歌手列表"
      navbar={
        <div className="artist-category">
          <div className="artist-area-list">
            {areaList.map((item) => (
              <div
                key={item.val}
                onClick={() => onSetArea(item.val)}
                className={
                  "category-item" + (item.val === area ? " active" : "")
                }
              >
                {" "}
                {item.text}
              </div>
            ))}
          </div>
          <div className="artist-type-list">
            {typeList.map((item) => (
              <div
                key={item.val}
                onClick={() => onSetType(item.val)}
                className={
                  "category-item" + (item.val === type ? " active" : "")
                }
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      }
      main={
        <div className="artist-list">
          {artistList.map((item) => (
            <ArtistItem artist={item} />
          ))}
        </div>
      }
    ></Page>
  );
};
