import { SearchDefault } from "src/types";
export const SET_SEARCH_HISTORY = "SET_SEARCH_HISTORY";
export const SET_SERACH_DEFAULT = "SET_SEARCH_DEFAULT";

interface SetSearchHistory {
  type: typeof SET_SEARCH_HISTORY;
  payload: string[];
}
interface SetSearchDefault {
  type: typeof SET_SERACH_DEFAULT;
  payload: SearchDefault | null;
}
export type SearchActionTypes = SetSearchHistory | SetSearchDefault;
export interface SearchState {
  history: string[];
  default: SearchDefault | null;
}
