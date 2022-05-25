import { createEffect, createResource, createSignal } from "solid-js";
import { getReq } from "../../utils/api";
import { useUser } from "./UserContext";

const fetchToDos = async () => {
  const [user] = useUser();
  return await getReq(`/todo/${user().email}`);
};

export default function ToDoList() {
  const [toDos] = createResource(true, fetchToDos);

  return (
    <div>
      <p>{toDos.loading && "Loading your To-Do's..."}</p>
      <p>
        {!toDos.loading && toDos().length === 0 && "You have nothing to do!"}
      </p>
      <ul>
        <For each={toDos()}>
          {(toDo) => (
            <li>
              <p>{toDo.description}</p>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
