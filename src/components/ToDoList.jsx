import { Button, Form, ListGroup, ListGroupItem } from "solid-bootstrap";
import { createEffect, createResource, createSignal } from "solid-js";
import { deleteReq, getReq, putReq } from "../../utils/api";
import { redirect, useUser } from "../../utils/helpers";
import { useDark } from "./DarkContext";
import ToDoItem from "./ToDoItem";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter
} from "@thisbeyond/solid-dnd";

const fetchToDos = async () => {
  const [user] = useUser();
  return await getReq(`/todo/${user.email}`);
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

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currToDos = [...props.toDos];
      const fromIndex = currToDos.findIndex(
        (toDo) => toDo.arrayIndex === draggable.id
      );
      const toIndex = currToDos.findIndex(
        (toDo) => toDo.arrayIndex === droppable.id
      );
      console.log(draggable, droppable);
      if (fromIndex !== toIndex) {
        const updatedToDos = currToDos.slice();
        updatedToDos.splice(toIndex, 0, ...updatedToDos.splice(fromIndex, 1));
        props.setToDos(updatedToDos);
        updatedToDos.forEach((toDo, index) => {
          putReq(`/todo/${toDo.toDoId}`, { arrayIndex: index + 1 });
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
              <ToDoItem
                toDo={toDo}
                index={index}
                toDos={props.toDos}
                setToDos={props.setToDos}
              />
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
