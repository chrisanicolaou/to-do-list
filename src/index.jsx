/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "solid-app-router";

import "./index.css";
import App from "./App";
import { UserProvider } from "./components/UserContext";

render(
  () => (
    <UserProvider user={""}>
      <Router>
        <App />
      </Router>
    </UserProvider>
  ),
  document.getElementById("root")
);
