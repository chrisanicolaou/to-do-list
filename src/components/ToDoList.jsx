import { Button, Form, ListGroup, ListGroupItem } from "solid-bootstrap";
import { createEffect, createResource, createSignal } from "solid-js";
import { getReq, putReq } from "../../utils/api";
import { redirect, useUser } from "../../utils/helpers";
import { useDark } from "./DarkContext";
import { AiOutlineEdit } from "solid-icons/ai";
import { TiTickOutline } from "solid-icons/ti";
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
  const [isEditing, setIsEditing] = createSignal(false);
  const [newDesc, setNewDesc] = createSignal("");

  const openEditMode = () => {
    setIsEditing(true);
    setNewDesc(props.toDo.description);
  };

  const editToDoDescription = async () => {
    props.setToDos(
      (toDo) => toDo.toDoId === props.toDo.toDoId,
      "description",
      newDesc()
    );
    const descToPost = newDesc();
    setIsEditing(false);
    setNewDesc("");
    await putReq(`/todo/${props.toDo.toDoId}`, { description: descToPost });
  };

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
      <ListGroupItem as="li" action style={{ display: "flex" }}>
        {isEditing() ? (
          <>
            <Form.Control
              onChange={(e) => setNewDesc(e.target.value)}
              value={newDesc()}
            />
            <Button
              onClick={editToDoDescription}
              variant="primary"
              size="sm"
              style={{
                "margin-left": "10px"
              }}
            >
              <TiTickOutline size={30} color="#000000" />
            </Button>
          </>
        ) : (
          <>
            <div
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
            </div>
            <Button
              onClick={openEditMode}
              variant="primary"
              size="sm"
              style={{
                padding: "1px",
                "padding-bottom": "2px",
                "margin-left": "10px"
              }}
            >
              <AiOutlineEdit size={20} color="#000000" />
            </Button>
          </>
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
