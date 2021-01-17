import { ThemeItem, Theme } from "src/types";
export const SET_THEME = "SET_THEME";

interface SetTheme {
  type: typeof SET_THEME;
  payload: Theme;
}

export type SystemActionTypes = SetTheme;
export interface SystemState {
  theme: {
    list: ThemeItem[];
    current: Theme;
  };
}
