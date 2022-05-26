import { ListGroup, ListGroupItem } from "solid-bootstrap";
import { createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { getReq, putReq } from "../../utils/api";
import { useDark } from "./DarkContext";
import { useUser } from "./UserContext";

const fetchToDos = async () => {
  const [user] = useUser();
  const [dark] = useDark();
  return await getReq(`/todo/${user().email}`);
};

export default function ToDoList() {
  const [toDosFromApi] = createResource(fetchToDos);
  const [toDos, setToDos] = createStore([]);

  createEffect(() => {
    console.log(localStorage.getItem("user"));
    if (!toDosFromApi.loading) {
      setToDos(toDosFromApi());
    }
  });

  const updateToDoActive = async (toDo, index, value) => {
    setToDos([index], "isActive", value);
    await putReq(`/todo/${toDo.toDoId}`, { isActive: value });
  };

  return (
    <div>
      <p>{toDosFromApi.loading && "Loading your To-Do's..."}</p>
      <p>
        {!toDosFromApi.loading &&
          toDosFromApi().length === 0 &&
          "You have nothing to do!"}
      </p>
      <ListGroup as="ul">
        <For each={toDos}>
          {(toDo, index) => (
            <ListGroupItem
              as="li"
              action
              onClick={() => updateToDoActive(toDo, [index()], !toDo.isActive)}
            >
              {toDo.isActive ? (
                toDo.description
              ) : (
                <strike>{toDo.description}</strike>
              )}
            </ListGroupItem>
          )}
        </For>
      </ListGroup>
    </div>
  );
}
