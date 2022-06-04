import { Button, Form, ListGroupItem } from "solid-bootstrap";
import { createSignal } from "solid-js";
import { deleteReq, putReq } from "../../utils/api";
import { useUser } from "../../utils/helpers";
import { AiOutlineEdit } from "solid-icons/ai";
import { TiTickOutline } from "solid-icons/ti";
import { ImCross } from "solid-icons/im";
import { createSortable } from "@thisbeyond/solid-dnd";

const ToDoItem = (props) => {
  const sortable = createSortable(props.toDo.arrayIndex, props.toDo);
  const [isEditing, setIsEditing] = createSignal(false);
  const [newDesc, setNewDesc] = createSignal("");
  const [user] = useUser();

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

  const deleteToDo = async () => {
    console.log(props.toDos);
    const updatedToDos = [...props.toDos];
    const index = updatedToDos.findIndex(
      (toDo) => toDo.toDoId === props.toDo.toDoId
    );
    updatedToDos.splice(index, 1);
    props.setToDos(updatedToDos);
    await deleteReq(`/todo/${props.toDo.toDoId}/t/t`);
  };

  const updateToDoActive = async (toDo, index, value, setToDos) => {
    setToDos([index], "isActive", value);
    console.log(`/todo/${toDo.toDoId}`);
    await putReq(`/todo/${toDo.toDoId}`, { isActive: value });
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
      <ListGroupItem
        as="li"
        action
        style={{ display: "flex", "align-content": "center" }}
      >
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
                "margin-left": "10px",
                "align-self": "center"
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
                "margin-left": "10px",
                "align-self": "center"
              }}
            >
              <AiOutlineEdit size={20} color="#000000" />
            </Button>
            <Button
              onClick={deleteToDo}
              variant="danger"
              size="sm"
              style={{
                padding: "3px",
                "margin-left": "10px",
                "align-self": "center"
              }}
            >
              <ImCross size={20} color="#FFFFFF" />
            </Button>
          </>
        )}
      </ListGroupItem>
    </div>
  );
};

export default ToDoItem;
