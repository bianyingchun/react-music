import { SET_THEME, SystemActionTypes } from "./../types/system";
import { Theme } from "src/types";

export const setTheme = (value: Theme): SystemActionTypes => ({
  type: SET_THEME,
  payload: value,
});
