import React, { useState, useRef, useEffect } from "react";
import { useRouteParamId } from "src/hooks/usePage";
import UserList from "src/compoents/achive/UserList";
import Page from "src/compoents/achive/PageLayout";
import { User } from "src/types";
import { useLoadMore, usePage } from "src/hooks/useLoadMore";
import { getFollowedList } from "src/common/api/user";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  let uid: number = useRouteParamId();
  const [list, setList] = useState<User[]>([]);
  const { loading, getList, refresh } = usePage(
    async (limit: number, offset: number) => {
      const res = await getFollowedList(uid, { limit, offset });
      setList((list) => [...list, ...res.data.followeds]);
      return res.data.more;
    }
  );
  const refreshElm = useRef<HTMLDivElement | null>(null);
  useLoadMore(refreshElm, getList);
  useEffect(() => {
    if (uid) {
      refresh();
      setList([]);
      getList();
    }
  }, [uid]);
  return (
    <Page
      title="粉丝列表"
      main={
        <div className="scroller-container" ref={refreshElm}>
          {loading && <div className="loading">loading</div>}
          <UserList list={list} />
        </div>
      }
    ></Page>
  );
};
