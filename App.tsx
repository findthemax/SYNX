import React from "react";
import { store } from "./state";

import { Provider } from "react-redux";

import Navigator from "./Navigator";

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
