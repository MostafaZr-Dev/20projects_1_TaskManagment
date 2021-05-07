import React from "react";
import { render } from "react-dom";

import App from "./Components/App";
import { AppProvider } from "./State";
import StyleProvider from "./Utils/Theme";

const app = document.getElementById("app");

render(
  <AppProvider>
    <StyleProvider>
      <App />
    </StyleProvider>
  </AppProvider>,
  app
);
