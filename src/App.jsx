import logo from "./logo.svg";
import styles from "./App.module.css";
import { Route, Routes } from "solid-app-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <div class={styles.App}>
      <h1>My app header</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
