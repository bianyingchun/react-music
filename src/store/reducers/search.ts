import * as Types from "../types/search";
import { loadSearch } from "src/common/js/cache";
const initialState: Types.SearchState = {
  history: loadSearch(),
  default: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialState,
  action: Types.SearchActionTypes
): Types.SearchState => {
  switch (action.type) {
    case Types.SET_SEARCH_HISTORY:
      return { ...state, history: action.payload };
    case Types.SET_SERACH_DEFAULT:
      return { ...state, default: action.payload };
    default:
      return state;
  }
};
