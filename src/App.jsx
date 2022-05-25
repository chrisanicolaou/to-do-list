import logo from "./logo.svg";
import styles from "./App.module.css";
import { Route, Routes } from "solid-app-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { useDark } from "./components/DarkContext";

export default function App() {
  const [dark] = useDark();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
