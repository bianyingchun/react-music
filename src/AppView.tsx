import React from "react";
import Player from "src/compoents/achive/Player";
import LoginBox from "src/compoents/achive/Login";
import { BrowserRouter } from "react-router-dom";
import RouterView from "./router";
import "src/assets/fonts/iconfont.css";
import "src/assets/scss/theme.scss";
import "src/assets/scss/base.scss";
import "src/assets/scss/common.scss";
import "swiper/swiper.scss";
import "./App.scss";
import { useCurrentSong } from "src/hooks/usePlayer";
import { withRouter } from "react-router-dom";
import { useLoginStatus } from "src/hooks/useAuth";
import { useTheme } from "src/hooks/useTheme";
const AppView: React.FC = () => {
  const currentSong = useCurrentSong();
  const { theme } = useTheme();
  const classList = ["theme", theme];
  if (currentSong.id) classList.push("player-visible");
  const logined = useLoginStatus();
  return (
    <div id="app" className={classList.join(" ")} key={Number(logined)}>
      <BrowserRouter>
        <RouterView></RouterView>
        <Player />
        <LoginBox></LoginBox>
      </BrowserRouter>
    </div>
  );
};

export default withRouter(AppView);
