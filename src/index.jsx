/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "solid-app-router";

import "./index.css";
import App from "./App";
import { UserProvider } from "./components/UserContext";
import { DarkProvider } from "./components/DarkContext";

render(
  () => (
    <UserProvider user={""}>
      <DarkProvider dark={false}>
        <Router>
          <App />
        </Router>
      </DarkProvider>
    </UserProvider>
  ),
  document.getElementById("root")
);
