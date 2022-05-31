import { Button, Form, FormText } from "solid-bootstrap";
import { createSignal } from "solid-js";
import { postReq } from "../../utils/api";
import { useUser } from "../../utils/helpers";
import styles from "../App.module.css";

function AddToDoForm({ setIsAdding, setToDos, toDos }) {
  const [toDoItem, setToDoItem] = createSignal();
  const [toDoItemError, setToDoItemError] = createSignal("");
  const [user, setUser] = useUser();

  const addToDo = async (e) => {
    e.preventDefault();
    if (!toDoItem()) {
      setToDoItemError("You haven't added anything!");
      return;
    }
    const dateCreated = Date.now().toString();
    const toDoToPost = {
      description: toDoItem(),
      userEmail: user.email,
      dateCreated: dateCreated,
      dateUpdated: dateCreated,
      arrayIndex: toDos.length + 1,
      isActive: true
    };
    const currToDos = [...toDos];
    setToDos((curr) => [...curr, toDoToPost]);
    setIsAdding(false);
    const result = await postReq(`/todo`, toDoToPost);
    setToDos([...currToDos, result]);
  };

  const cancelSubmit = () => {
    setIsAdding(false);
  };

  return (
    <div>
      <Form
        onSubmit={addToDo}
        style={{ display: "flex", "flex-direction": "column" }}
      >
        <Form.Control
          placeholder="What do you need to do?"
          onChange={(e) => setToDoItem(e.target.value)}
          value={toDoItem()}
        />
        <FormText class={styles.errorText}>
          {toDoItemError() !== "" ? toDoItemError() : null}
        </FormText>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
      <Button variant="secondary" onClick={cancelSubmit}>
        Cancel
      </Button>
    </div>
  );
}
export default AddToDoForm;
