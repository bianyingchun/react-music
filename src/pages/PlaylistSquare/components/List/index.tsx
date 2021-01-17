import React, { useState, useRef, useEffect, useCallback } from "react";
import "./style.scss";
import MixItem from "src/compoents/achive/MixItem";
import { getTopPlaylist, getHqPlaylist } from "src/common/api/playlist";
import { useLoadMore } from "src/hooks/useLoadMore";
import { Playlist } from "src/types";
import { toast } from "src/compoents/widgets/Toast";
const LIMIT = 30;
interface Props {
  name: string;
  tag: string;
  onShowHq: () => void;
}
// eslint-disable-next-line import/no-anonymous-default-export
const MixList: React.FC<Props> = ({ name, tag = "全部", onShowHq }) => {
  const isHq = name === "精品";
  const prevTag = useRef(tag);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Playlist[]>([]);
  const pageInfo = useRef({
    page: 1,
    before: 0,
    hasMore: true,
  });
  const refreshElem = useRef<HTMLDivElement | null>(null);
  const getList = useCallback(async () => {
    try {
      if (!pageInfo.current.hasMore || loading) return;
      //   setLoading(true);
      let res: any = null;
      if (isHq) {
        res = await getHqPlaylist({
          limit: LIMIT,
          before: pageInfo.current.before,
          cat: tag,
        });
        pageInfo.current.before =
          res.data.playlists[res.data.playlists.length - 1].updateTime;
      } else {
        const offset = (pageInfo.current.page - 1) * LIMIT;
        res = await getTopPlaylist(name === "推荐" ? "全部" : name, {
          limit: LIMIT,
          offset,
        });
      }
      pageInfo.current.hasMore = res.data.more;
      pageInfo.current.page += 1;
      setList((list) => [...list, ...res.data.playlists]);
    } catch (err) {
      toast("加载失败");
    } finally {
      //   setLoading(false);
    }
  }, [isHq, loading, name, tag]);
  useLoadMore(refreshElem, getList);
  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    if (isHq && tag !== prevTag.current) {
      pageInfo.current = {
        hasMore: true,
        before: 0,
        page: 1,
      };
      setList([]);
      getList();
    }
    prevTag.current = tag;
  }, [tag]);
  return (
    <div className="mix-list-container" ref={refreshElem}>
      {isHq && (
        <div className="title">
          <div className="text">{tag}</div>
          <div className="filter-btn" onClick={onShowHq}>
            <span className="iconfont icon-add"></span>
            筛选
          </div>
        </div>
      )}
      <div className="mix-list">
        {list.map((item, index) => (
          <MixItem key={index} mix={item}></MixItem>
        ))}
      </div>
    </div>
  );
};

export default MixList;
