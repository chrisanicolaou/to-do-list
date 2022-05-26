import { useNavigate } from "solid-app-router";
import { Button } from "solid-bootstrap";
import { createEffect, Suspense, useContext } from "solid-js";
import { redirect, useUser } from "../../utils/helpers";
import ToDoList from "../components/ToDoList";

export default function Home() {
  const navigation = useNavigate();
  const [user, setUser] = useUser();
  createEffect(() => {
    redirect();
  });

  const userLogOut = () => {
    localStorage.removeItem("user");
    navigation("/");
  };

  return (
    <div>
      <h1>My To-Dos</h1>
      <ToDoList />
      <Button variant="primary" size="sm" onClick={userLogOut}>
        Log Out
      </Button>
    </div>
  );
}
