import { Dispatch } from "redux";
import { getSearchDefault } from "src/common/api/search";
import {
  SET_SEARCH_HISTORY,
  SET_SERACH_DEFAULT,
  SearchActionTypes,
} from "../types/search";
import { saveSearch, deleteSearch, clearSearch } from "src/common/js/cache";
export const saveSearchHistory = (query: string): SearchActionTypes => ({
  type: SET_SEARCH_HISTORY,
  payload: saveSearch(query),
});

export const deleteSearchHistory = (query: string): SearchActionTypes => ({
  type: SET_SEARCH_HISTORY,
  payload: deleteSearch(query),
});

export const clearSearchHistory = (): SearchActionTypes => ({
  type: SET_SEARCH_HISTORY,
  payload: clearSearch(),
});

export const fetchSearchDefault = () => async (
  dispatch: Dispatch<SearchActionTypes>
) => {
  try {
    const res = await getSearchDefault();
    dispatch({
      type: SET_SERACH_DEFAULT,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};
