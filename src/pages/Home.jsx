import { useNavigate } from "solid-app-router";
import { Button } from "solid-bootstrap";
import { createEffect, createSignal, Suspense, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { redirect, useUser } from "../../utils/helpers";
import AddToDoForm from "../components/AddToDoForm";
import ToDoList from "../components/ToDoList";

export default function Home() {
  const navigation = useNavigate();
  const [user, setUser] = useUser();
  const [toDos, setToDos] = createStore([]);
  const [isAdding, setIsAdding] = createSignal(false);
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
      <ToDoList toDos={toDos} setToDos={setToDos} />
      {isAdding() ? null : (
        <Button variant="primary" size="sm" onClick={() => setIsAdding(true)}>
          Add a ToDo
        </Button>
      )}
      {isAdding() ? (
        <AddToDoForm setIsAdding={setIsAdding} setToDos={setToDos} />
      ) : null}
      <Button variant="primary" size="sm" onClick={userLogOut}>
        Log Out
      </Button>
    </div>
  );
}
