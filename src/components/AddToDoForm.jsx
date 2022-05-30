import { Button, Form } from "solid-bootstrap";
import { createSignal } from "solid-js";
import { postReq } from "../../utils/api";
import { useUser } from "../../utils/helpers";

function AddToDoForm({ setIsAdding, setToDos, toDos }) {
  const [toDoItem, setToDoItem] = createSignal();
  const [user, setUser] = useUser();

  const addToDo = async (e) => {
    e.preventDefault();
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

  return (
    <Form onSubmit={addToDo}>
      <Form.Control
        placeholder="What do you need to do?"
        onChange={(e) => setToDoItem(e.target.value)}
        value={toDoItem()}
      />
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
}
export default AddToDoForm;
