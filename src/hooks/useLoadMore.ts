import _ from "lodash";
import {
  useEffect,
  MutableRefObject,
  useRef,
  useState,
  useCallback,
} from "react";

export function useLoadMore(
  refreshElm: MutableRefObject<null | HTMLElement>,
  loadData: () => Promise<void>
) {
  useEffect(() => {
    const element = refreshElm.current;
    const _loadMore = _.throttle(async () => {
      if (!element) return;
      const containerHeight = element.clientHeight;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      if (containerHeight + scrollTop + 20 >= scrollHeight) {
        loadData();
      }
    }, 200);
    element?.addEventListener("scroll", _loadMore);
    return () => {
      element?.removeEventListener("scroll", _loadMore);
    };
  }, [refreshElm, loadData]);
}

const LIMIT = 50;
export const usePage = (
  getData: (limit: number, offset: number) => Promise<any>
) => {
  const pageInfo = useRef({
    page: 1,
    hasMore: true,
  });

  const [loading, setLoading] = useState(false);
  const getList = useCallback(async () => {
    const { hasMore, page } = pageInfo.current;
    if (!hasMore || loading) return;
    setLoading(true);
    pageInfo.current.hasMore = await getData(LIMIT, (page - 1) * LIMIT);
    pageInfo.current.page++;
    setLoading(false);
  }, [getData, loading]);
  const refresh = () => {
    pageInfo.current = {
      page: 1,
      hasMore: true,
    };
    getList();
  };
  return {
    getList,
    loading,
    refresh,
  };
};
