import React, { useCallback, useEffect, useState, useRef } from "react";
import { search } from "src/common/api/search";
import { useLoadMore } from "src/hooks/useLoadMore";
import { SearchTypeVal, SearchUserResult, User } from "src/types";
import { toast } from "src/compoents/widgets/Toast";
import UserList from "src/compoents/achive/UserList";
// eslint-disable-next-line import/no-anonymous-default-export
interface Props {
  query: string;
  active: boolean;
}
const TrackList: React.FC<Props> = ({ query, active }) => {
  const [loading, setLoading] = useState(false);
  const hasMore = useRef(true);
  const [list, setList] = useState<User[]>([]);

  const getList = useCallback(async () => {
    try {
      if (!hasMore.current || loading) return;
      //   setLoading(true);
      const res = await search<SearchUserResult>({
        type: SearchTypeVal.user,
        keywords: query,
      });
      hasMore.current = res.data.result.hasMore;
      setList((list) => [...list, ...res.data.result.userprofiles]);
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

  return (
    <div className="result-list" ref={refreshElem}>
      <UserList list={list} />
    </div>
  );
};

export default TrackList;
