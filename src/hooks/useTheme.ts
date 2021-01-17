import { RootState } from "src/store";
import { useSelector } from "react-redux";
export function useTheme() {
  const theme = useSelector((state: RootState) => state.system.theme.current);
  return {
    theme,
  };
}
