import React, { useEffect, useState } from "react";
import "./style.scss";
import MixItem from "src/compoents/achive/MixItem";
import Page from "src/compoents/achive/PageLayout";
import { getAllTopList } from "src/common/api/toplist";
import { Playlist } from "src/types";
const Toplist = () => {
  const [sList, setSList] = useState<Playlist[]>([]);
  const [gList, setGList] = useState<Playlist[]>([]);
  useEffect(() => {
    async function getList() {
      const res = await getAllTopList();
      const list = res.data.list;
      const a: Playlist[] = [];
      const b: Playlist[] = [];
      list.forEach((item) => {
        if (item.ToplistType) {
          a.push(item);
        } else {
          b.push(item);
        }
      });
      setSList(a);
      setGList(b);
    }
    getList();
  }, []);
  return (
    <Page
      title="排行榜"
      main={
        <div className="toplist-container">
          <h3>云音乐特色榜</h3>
          <div className="mix-list">
            {sList.map((item, index) => (
              <MixItem key={item.id} isToplist={true} mix={item}></MixItem>
            ))}
          </div>
          <h3>全球媒体榜</h3>
          <div className="mix-list">
            {gList.map((item, index) => (
              <MixItem key={item.id} isToplist={true} mix={item}></MixItem>
            ))}
          </div>
        </div>
      }
    ></Page>
  );
};

export default Toplist;
