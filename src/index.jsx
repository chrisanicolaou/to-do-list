/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "solid-app-router";

import "./index.css";
import App from "./App";
import { UserProvider } from "./components/UserContext";
import { DarkProvider } from "./components/DarkContext";

render(
  () => (
    <Router>
      <UserProvider user={""}>
        <DarkProvider dark={false}>
          <App />
        </DarkProvider>
      </UserProvider>
    </Router>
  ),
  document.getElementById("root")
);
