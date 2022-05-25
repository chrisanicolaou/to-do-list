import { useNavigate } from "solid-app-router";
import { Button, Form } from "solid-bootstrap";
import { createSignal, useContext } from "solid-js";
import { getReq } from "../../utils/api";
import FormInput from "./FormInput";
import { useUser } from "./UserContext";

export default function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [user, setUser] = useUser();
  const navigate = useNavigate();

  const onLoginPress = async (e) => {
    try {
      e.preventDefault();
      const result = await getReq(`/login/${email()}/${password()}`);
      setUser(result);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const onSignUpPress = () => {
    navigate("/signup");
  };

  return (
    <div>
      <Form onSubmit={onLoginPress}>
        <FormInput
          controlId="emailInput"
          label="Email address"
          type="email"
          placeholder="Enter email"
          onBlur={(e) => setEmail(e.target.value)}
        />
        <FormInput
          controlId="passwordInput"
          label="Password"
          type="password"
          placeholder="Enter password"
          onBlur={(e) => setPassword(e.target.value)}
        />
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
