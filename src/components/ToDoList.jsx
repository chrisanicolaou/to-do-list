import { createEffect, createResource, createSignal } from "solid-js";
import { getReq } from "../../utils/api";
import { useDark } from "./DarkContext";
import { useUser } from "./UserContext";

const fetchToDos = async () => {
  const [user] = useUser();
  const [dark] = useDark();
  return await getReq(`/todo/${user().email}`);
};

export default function ToDoList() {
  const [toDos] = createResource(fetchToDos);

  return (
    <div>
      <p>{toDos.loading && "Loading your To-Do's..."}</p>
      <p>
        {!toDos.loading && toDos().length === 0 && "You have nothing to do!"}
      </p>
      <ul>
        <For each={toDos()}>
          {(toDo, index) => (
            <li
              onClick={() =>
                console.log(
                  `clicked ${index()} --- ${toDos()[index()].description}`
                )
              }
            >
              {toDo.description}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
