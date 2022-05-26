import { useNavigate } from "solid-app-router";
import { Button, Form, FormText } from "solid-bootstrap";
import { createSignal, useContext } from "solid-js";
import { getReq } from "../../utils/api";
import { checkEmptyFields } from "../../utils/helpers";
import { useUser } from "./UserContext";
import styles from "../App.module.css";

export default function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [errors, setErrors] = createSignal({
    email: "",
    password: ""
  });
  const [password, setPassword] = createSignal("");
  const [user, setUser] = useUser();
  const navigate = useNavigate();

  const onLoginPress = async (e) => {
    try {
      e.preventDefault();
      await checkEmptyFields({ email: email(), password: password() });
      const result = await getReq(`/login/${email()}/${password()}`);
      setUser(result);
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/home");
    } catch (err) {
      console.log(err);
      switch (err) {
        case "email":
          setErrors({ email: "Please enter an email address", password: "" });
          break;
        case "password":
          setErrors({ email: "", password: "Please enter a password" });
          break;
      }
    }
  };

  const onSignUpPress = () => {
    navigate("/signup");
  };

  return (
    <div>
      <Form onSubmit={onLoginPress}>
        <Form.Group class="mb-3" controlId="emailInput">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter your email"
            onBlur={(e) => setEmail(e.target.value)}
          />
          <FormText class={styles.errorText}>
            {errors().email !== "" ? errors().email : null}
          </FormText>
        </Form.Group>
        <Form.Group class="mb-3" controlId="passwordInput">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            onBlur={(e) => setPassword(e.target.value)}
          />
          <FormText class={styles.errorText}>
            {errors().password !== "" ? errors().password : null}
          </FormText>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Button variant="outline-secondary" size="sm" onClick={onSignUpPress}>
        Don't have an account? Create one
      </Button>
    </div>
  );
}
