import { useNavigate } from "solid-app-router";
import { Button } from "solid-bootstrap";
import { createEffect, Suspense, useContext } from "solid-js";
import { redirect } from "../../utils/helpers";
import ToDoList from "../components/ToDoList";
import { UserContext } from "../components/UserContext";

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  const navigation = useNavigate();
  createEffect(() => {
    redirect();
  });

  const userLogOut = () => {
    setUser("");
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
