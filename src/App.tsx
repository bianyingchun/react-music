import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppView from "./AppView";
function App() {
  return (
    <Provider store={store}>
      <AppView />
    </Provider>
  );
}

export default App;
