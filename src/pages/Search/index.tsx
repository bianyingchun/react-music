import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import _ from "lodash";
import { getSearchHot, getSearchSuggest } from "src/common/api/search";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "src/store";
import {
  saveSearchHistory,
  clearSearchHistory,
  fetchSearchDefault,
} from "src/store/actions/search";
import { SEARCH_TYPES } from "src/common/js/config";
import { useNavSwiper } from "src/hooks/useNavSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { HotSearchItem, SuggestItem } from "src/types";
import { useBack } from "src/hooks/shared";
import SearchResult from "./components/Result";
import { Link } from "react-router-dom";
import { confirm } from "src/compoents/widgets/Dialog";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [hotList, setHotList] = useState<HotSearchItem[]>([]);
  const { history, defaultQuery } = useSelector((state: RootState) => {
    return {
      history: state.search.history,
      defaultQuery: state.search.default,
    };
  }, shallowEqual);

  const dispatch = useDispatch();
  const saveHistory = useCallback(
    (query: string) => {
      dispatch(saveSearchHistory(query));
    },
    [dispatch]
  );
  const clearHistory = useCallback(() => {
    confirm("确认清空所有记录吗")
      .then(() => {
        dispatch(clearSearchHistory());
      })
      .catch((res) => console.log(res));
  }, [dispatch]);

  useEffect(() => {
    async function fetchSearchHot() {
      try {
        const res = await getSearchHot();
        setHotList(res);
      } catch (err) {}
    }
    fetchSearchDefault();
    fetchSearchHot();
  }, []);
  const [query, setQuery] = useState("");
  const [suggestList, setSuggest] = useState<SuggestItem[]>([]);
  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      doSearch(event.currentTarget.value);
    }
  }
  const [realQuery, setRealQuery] = useState("");
  function doSearch(query: string) {
    saveHistory(query);
    setQuery(query);
    setRealQuery(query);
    setSuggest([]);
  }
  const fetchSuggest = _.debounce(async (value: string) => {
    if (value) {
      const res = await getSearchSuggest(value);
      setSuggest(res);
    } else {
      setSuggest([]);
    }
  });
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.currentTarget.value.trim();
    setQuery(text);
    fetchSuggest(text);
  }

  const { back } = useBack();
  function onBack() {
    if (realQuery) {
      setQuery("");
      setRealQuery("");
    } else {
      back();
    }
  }
  function onFocus() {
    fetchSuggest(query);
    // setShowSuggest(true);
  }
  function onBlur() {
    // setSuggest([]);
    // setShowSuggest(false);
  }

  const { NavList, navIndex, setSwiper, onSlideChange } = useNavSwiper(
    SEARCH_TYPES
  );
  return (
    <div className="search-container">
      <div className="search-header">
        <div className="search-box-container">
          <div className="search-box">
            <i className="iconfont icon-back" onClick={onBack}></i>
            <div className="input-box">
              <input
                type="text"
                placeholder={defaultQuery ? defaultQuery.showKeyword : ""}
                onKeyPress={onKeyPress}
                onBlur={onBlur}
                onFocus={onFocus}
                value={query}
                onChange={onChange}
              />
              {!!query && <i className="iconfont icon-close"></i>}
            </div>
          </div>
          <div className="suggest-list">
            {suggestList.map((item, index) => (
              <div
                className="item"
                key={index}
                onClick={() => doSearch(item.keyword)}
              >
                {item.keyword}
              </div>
            ))}
          </div>
        </div>
        {!!realQuery && NavList}
      </div>
      <div className="search-main">
        <div
          className="shortcut-container"
          style={{ display: realQuery ? "none" : "block" }}
        >
          <div className="search-history">
            <h4 className="title">历史</h4>
            <div className="history-list">
              {history.map((item) => (
                <span
                  className="item"
                  key={item}
                  onClick={() => doSearch(item)}
                >
                  {item}
                </span>
              ))}
            </div>
            <i className="iconfont icon-delete" onClick={clearHistory}></i>
          </div>
          <div className="hot-search">
            <h4 className="title">热搜榜</h4>
            <div className="hot-list">
              {hotList.map((item, index) => (
                <div
                  className={index < 3 ? "item top" : "item"}
                  key={index}
                  onClick={() => doSearch(item.searchWord)}
                >
                  <span className="index">{index + 1}</span>
                  <span className="text">{item.searchWord}</span>
                  {!!item.iconUrl && (
                    <img src={item.iconUrl} alt="" className="icon" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="feature-list">
            <Link className="item" to="/artists">
              歌手分类
            </Link>
          </div>
        </div>
        {!!realQuery && (
          <Swiper
            onSlideChange={onSlideChange}
            onSwiper={setSwiper}
            className="search-result-content"
          >
            {SEARCH_TYPES.map((item, index) => (
              <SwiperSlide key={item.name}>
                <SearchResult
                  type={item.val}
                  query={realQuery}
                  active={navIndex === index}
                  key={realQuery}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};
