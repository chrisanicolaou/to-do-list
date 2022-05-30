import { ListGroup, ListGroupItem } from "solid-bootstrap";
import { createEffect, createResource, createSignal, from } from "solid-js";
import { getReq, putReq } from "../../utils/api";
import { redirect, useUser } from "../../utils/helpers";
import { useDark } from "./DarkContext";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter
} from "@thisbeyond/solid-dnd";

const fetchToDos = async () => {
  const [user, setUser] = useUser();
  return await getReq(`/todo/${user.email}`);
};

const Sortable = (props) => {
  const sortable = createSortable(props.toDo.arrayIndex, props.toDo);
  return (
    // <div
    //   use:sortable
    //   class="sortable"
    //   classList={{ "opacity-25": sortable.isActiveDraggable }}
    // >
    //   {props.toDo.description}
    // </div>
    <div
      use:sortable
      class="sortable"
      classList={{ "opacity-25": sortable.isActiveDraggable }}
    >
      <ListGroupItem
        as="li"
        action
        onClick={() =>
          updateToDoActive(
            props.toDo,
            [props.index()],
            !props.toDo.isActive,
            props.setToDos
          )
        }
      >
        {props.toDo.isActive ? (
          props.toDo.description
        ) : (
          <strike>{props.toDo.description}</strike>
        )}
      </ListGroupItem>
    </div>
  );
};

const updateToDoActive = async (toDo, index, value, setToDos) => {
  setToDos([index], "isActive", value);
  console.log(`/todo/${toDo.toDoId}`);
  await putReq(`/todo/${toDo.toDoId}`, { isActive: value });
};

export default function ToDoList(props) {
  const [dark] = useDark();
  const [toDosFromApi] = createResource(fetchToDos);
  const [activeItem, setActiveItem] = createSignal(null);
  const ids = () => props.toDos.map((toDo) => toDo.arrayIndex);

  createEffect(() => {
    redirect();
    if (!toDosFromApi.loading) {
      props.setToDos(toDosFromApi());
    }
  });

  const onDragStart = ({ draggable }) => {
    setActiveItem(draggable.arrayIndex);
  };

  const onDragEnd = async ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currToDos = [...props.toDos];
      const fromIndex = currToDos.findIndex(
        (toDo) => toDo.arrayIndex === draggable.id
      );
      const toIndex = currToDos.findIndex(
        (toDo) => toDo.arrayIndex === droppable.id
      );
      console.log(fromIndex, toIndex);
      if (fromIndex !== toIndex) {
        const updatedToDos = currToDos.slice();
        updatedToDos.splice(toIndex, 0, ...updatedToDos.splice(fromIndex, 1));
        props.setToDos(updatedToDos);
        updatedToDos.forEach((toDo, index) => {
          putReq(`/todo/${toDo.toDoId}`, { arrayIndex: index });
        });
      }
    }
    setActiveItem(null);
  };

  return (
    <div>
      <p>{toDosFromApi.loading && "Loading your To-Do's..."}</p>
      <p>
        {!toDosFromApi.loading &&
          toDosFromApi().length === 0 &&
          "You have nothing to do!"}
      </p>
      <DragDropProvider
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetector={closestCenter}
      >
        <DragDropSensors />
        <SortableProvider ids={ids()}>
          {/* <ListGroup as="ul"> */}
          <For each={props.toDos}>
            {(toDo, index) => (
              <Sortable toDo={toDo} index={index} setToDos={props.setToDos} />
            )}
          </For>
        </SortableProvider>
        {/* </ListGroup> */}
        <DragOverlay>
          <div class="sortable">{activeItem()}</div>
        </DragOverlay>
      </DragDropProvider>
    </div>
  );
}
