import { SET_THEME, SystemActionTypes, SystemState } from "../types/system";
import { THEME_LIST } from "src/common/js/config";
import { Theme } from "src/types";
import { loadTheme, saveTheme } from "src/common/js/cache";
const initialState: SystemState = {
  theme: {
    list: THEME_LIST,
    current: (loadTheme() as Theme) || Theme.light,
  },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialState,
  action: SystemActionTypes
): SystemState => {
  switch (action.type) {
    case SET_THEME: {
      saveTheme(action.payload);
      return { ...state, theme: { ...state.theme, current: action.payload } };
    }
    default:
      return state;
  }
};
