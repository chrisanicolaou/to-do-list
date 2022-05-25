import { useNavigate } from "solid-app-router";
import { createEffect, Suspense, useContext } from "solid-js";
import { redirect } from "../../utils/redirect";
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
  };

  return (
    <div>
      <h1>{user().email}</h1>
      <h1>My To-Dos</h1>
      <ToDoList />
      <button onClick={userLogOut}>Logout</button>
    </div>
  );
}
