/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "solid-app-router";

import "./index.css";
import App from "./App";
import { DarkProvider } from "./components/DarkContext";

render(
  () => (
    <Router>
      <DarkProvider dark={false}>
        <App />
      </DarkProvider>
    </Router>
  ),
  document.getElementById("root")
);
