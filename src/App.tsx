import React from "react";
import "src/assets/fonts/iconfont.css";
import "./App.scss";
import RouterView from "./router";
import store from "./store";
import { Provider } from "react-redux";
import Player from "src/compoents/achive/Player";
function App() {
  return (
    <div id="app" className="dark">
      <Provider store={store}>
        <RouterView></RouterView>
        <Player />
      </Provider>
    </div>
  );
}

export default App;
